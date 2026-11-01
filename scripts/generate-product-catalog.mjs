#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "assets/data/products.json");
const resourcesPath = path.join(root, "resources.html");
const homePath = path.join(root, "index.html");
const storeUrl = "https://www.teacherspayteachers.com/store/sensory-spot-studio";

const markers = {
  catalog: ["<!-- PRODUCT_CATALOG_START -->", "<!-- PRODUCT_CATALOG_END -->"],
  categoryNav: ["<!-- PRODUCT_CATEGORY_NAV_START -->", "<!-- PRODUCT_CATEGORY_NAV_END -->"],
  home: ["<!-- HOME_PRODUCT_SHOWCASE_START -->", "<!-- HOME_PRODUCT_SHOWCASE_END -->"]
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const catalog = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function replaceBetweenMarkers(filePath, [start, end], content) {
  const page = fs.readFileSync(filePath, "utf8");
  const startIndex = page.indexOf(start);
  const endIndex = page.indexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Required generated-content markers are missing or out of order in ${path.basename(filePath)}`);
  }
  const output = `${page.slice(0, startIndex + start.length)}\n${content}\n    ${page.slice(endIndex)}`;
  fs.writeFileSync(filePath, output);
}

function hasVerifiedIndividualUrl(product) {
  if (!product.tptUrl) return false;
  try {
    const url = new URL(product.tptUrl);
    return url.protocol === "https:"
      && url.hostname === "www.teacherspayteachers.com"
      && /^\/Product\/.+-\d+$/.test(url.pathname);
  } catch {
    return false;
  }
}

function sortByDisplayOrder(products) {
  return [...products].sort((a, b) => {
    const aOrder = Number.isFinite(a.displayOrder) ? a.displayOrder : Number.MAX_SAFE_INTEGER;
    const bOrder = Number.isFinite(b.displayOrder) ? b.displayOrder : Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder || a.title.localeCompare(b.title);
  });
}

function sortByFeaturedOrder(products) {
  return [...products].sort((a, b) => a.featuredOrder - b.featuredOrder);
}

function productCard(product) {
  const details = [];
  if (product.gradeRange) details.push(`<span><strong>Grades:</strong> ${escapeHtml(product.gradeRange)}</span>`);
  if (product.seasonalTheme) details.push(`<span><strong>Theme:</strong> ${escapeHtml(product.seasonalTheme)}</span>`);
  if (product.priceStatus === "free") details.push("<span><strong>Status:</strong> Free resource</span>");

  const hasCompleteImage = product.thumbnail
    && product.thumbnailAlt
    && Number.isFinite(product.thumbnailWidth)
    && Number.isFinite(product.thumbnailHeight);
  const media = hasCompleteImage
    ? `\n          <img class="product-card__image" src="${escapeHtml(product.thumbnail)}" width="${product.thumbnailWidth}" height="${product.thumbnailHeight}" loading="lazy" alt="${escapeHtml(product.thumbnailAlt)}">`
    : "";
  const action = hasVerifiedIndividualUrl(product)
    ? `\n            <a class="button button--secondary" href="${escapeHtml(product.tptUrl)}" target="_blank" rel="noopener noreferrer" data-tpt-link data-product-id="${escapeHtml(product.id)}" data-product-category="${escapeHtml(product.category)}" data-destination-type="product">View on Teachers Pay Teachers</a>`
    : "";

  return `        <article class="product-card${hasCompleteImage ? "" : " product-card--text-only"}" id="product-${escapeHtml(product.id)}">${media}
          <div class="product-card__body">
            <h3>${escapeHtml(product.title)}</h3>
            <p>${escapeHtml(product.shortDescription)}</p>
${details.length ? `            <div class="product-meta">${details.join("")}</div>\n` : ""}            <p class="skills"><strong>Skills:</strong> ${product.skills.map(escapeHtml).join(", ")}</p>${action}
          </div>
        </article>`;
}

const publishedWithVerifiedUrl = catalog.products.filter((product) =>
  product.availability === "published" && hasVerifiedIndividualUrl(product)
);

const selectedCategories = catalog.categories.map((category) => {
  const products = sortByDisplayOrder(publishedWithVerifiedUrl.filter((product) =>
    product.category === category.id && Number.isFinite(product.displayOrder)
  )).slice(0, 3);
  return {...category, products};
});

const categoryNav = `<ul class="category-nav">${selectedCategories.map((category) =>
  `<li><a href="#${escapeHtml(category.id)}">${escapeHtml(category.name)}</a></li>`
).join("")}</ul>`;

const resourceCatalog = selectedCategories.map((category) => `    <section class="catalog-section section" id="${escapeHtml(category.id)}" aria-labelledby="${escapeHtml(category.id)}-heading">
      <div class="container">
        <div class="section-heading">
          <h2 id="${escapeHtml(category.id)}-heading">${escapeHtml(category.name)}</h2>
          <p>${escapeHtml(category.description)}</p>
        </div>
${category.products.length ? `        <div class="product-grid">
${category.products.map(productCard).join("\n")}
        </div>` : `        <div class="category-empty">
          <p>No individual listings in this category have been verified for the website yet.</p>
          <a class="text-link" href="${storeUrl}" target="_blank" rel="noopener noreferrer" data-tpt-link data-product-category="${escapeHtml(category.id)}" data-destination-type="storefront">Browse all resources in the TPT store</a>
        </div>`}
      </div>
    </section>`).join("\n\n");

const featured = sortByFeaturedOrder(catalog.products.filter((product) =>
  product.availability === "published"
    && product.featured
    && Number.isFinite(product.featuredOrder)
)).slice(0, 3);
const homeShowcase = `    <section class="section section--white" aria-labelledby="featured-products-heading">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Curated resources</span>
          <h2 id="featured-products-heading">Featured from Sensory SpOT Studio.</h2>
          <p>A small selection of practical resources for classrooms, therapy sessions, and home learning.</p>
        </div>
        <div class="product-grid featured-product-grid">
${featured.map(productCard).join("\n")}
        </div>
        <div class="showcase-actions"><a class="text-link showcase-store-link" href="${storeUrl}" target="_blank" rel="noopener noreferrer" data-tpt-link data-destination-type="storefront">Browse All Resources on Teachers Pay Teachers</a></div>
      </div>
    </section>`;

replaceBetweenMarkers(resourcesPath, markers.categoryNav, categoryNav);
replaceBetweenMarkers(resourcesPath, markers.catalog, resourceCatalog);
replaceBetweenMarkers(homePath, markers.home, homeShowcase);

console.log(`Generated ${featured.length} homepage cards and ${selectedCategories.reduce((sum, category) => sum + category.products.length, 0)} curated resource cards.`);
