#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "assets", "docs", "scripts"].includes(entry.name)) return [];
      return htmlFiles(fullPath);
    }
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

const pages = htmlFiles(root).flatMap((file) => {
  const html = fs.readFileSync(file, "utf8");
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)/i)?.[1] || "";
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1];
  if (!canonical || /noindex/i.test(robots)) return [];
  return [{
    loc: canonical,
    lastmod: fs.statSync(file).mtime.toISOString().slice(0, 10)
  }];
}).sort((a, b) => {
  if (a.loc === "https://www.sensoryspotstudio.com/") return -1;
  if (b.loc === "https://www.sensoryspotstudio.com/") return 1;
  return a.loc.localeCompare(b.loc);
});

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const body = pages.map((page) => `  <url><loc>${escapeXml(page.loc)}</loc><lastmod>${page.lastmod}</lastmod></url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${pages.length} canonical pages`);
