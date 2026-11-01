(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") === "true" &&
          !nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1020) setMenu(false);
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  var config = window.SENSORY_SPOT_CONFIG || {};
  var measurementId = config.ga4MeasurementId;

  if (typeof measurementId === "string" && /^G-[A-Z0-9]+$/.test(measurementId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });

    var analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(analyticsScript);

    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[data-tpt-link]");
      if (!link) return;

      window.gtag("event", "tpt_outbound_click", {
        product_id: link.dataset.productId || "storefront",
        product_category: link.dataset.productCategory || "storefront",
        destination_type: link.dataset.destinationType || (link.dataset.productId ? "product" : "storefront"),
        source_page: window.location.pathname
      });
    });
  }
}());
