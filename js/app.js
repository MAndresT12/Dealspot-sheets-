/* =========================================================
   SaveMoreDeals / AhorraMásUSA — app.js
   v2.0 — i18n bilingüe, cupones con countdown, logo dinámico

   Para cambiar el Google Sheet:
   1. Archivo → Compartir → Publicar en la web → CSV → Publicar
   2. Copia la URL y pégala en CSV_URL abajo
   ========================================================= */
"use strict";

/* ── CONFIG ─────────────────────────────────────────────── */
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-cKq84KXQEvTuI8Ep7bRM-dAY5OaGTYZbYqBEtFTK5QI2EQV66buYJHbXrgcpgtQTbwn9Kbfzu7eC/pub?gid=1330817725&single=true&output=csv";
const DEALS_PER_PAGE = 12;

/* ── i18n ────────────────────────────────────────────────── */
const I18N = {
  es: {
    /* App */
    appName: "AhorraMásUSA",
    logoSrc: "images/logo-es.png",
    pageTitle: "AhorraMásUSA — Las Mejores Ofertas",
    /* Header */
    searchPlaceholder: "🔍 Buscar ofertas…",
    /* Hero */
    heroBadge: "🟢 Actualizado automáticamente · ",
    heroDeals: "ofertas",
    heroH1: 'Las mejores<br/><span class="hero-h1-accent">ofertas del día</span>',
    heroSub: "Deals verificados en tecnología, gaming, hogar y más. Redirige directo a la tienda.",
    heroSearch: "🔍 Buscar entre todas las ofertas…",
    /* Disclosure */
    disclosureText: 'ℹ️ <strong>Aviso:</strong> Este sitio contiene enlaces de afiliados. Podemos ganar una comisión si compras a través de nuestros links, sin costo adicional para ti.',
    /* Cats */
    catAll: "🌟 Todos",
    catTec: "💻 Tecnología",
    catGaming: "🎮 Gaming",
    catHogar: "🏠 Hogar",
    catModa: "👗 Moda",
    catDeportes: "⚽ Deportes",
    catBelleza: "💄 Belleza",
    catOtros: "📦 Otros",
    /* Section */
    sectionTitle: "🔥 Todas las Ofertas",
    loading: "Cargando ofertas desde Google Sheets…",
    /* Cards */
    seeOffer: "🛒 Ver oferta →",
    seePrice: "Ver precio →",
    couponLabel: "Cupón",
    copyBtn: "Copiar",
    copied: "✓ Copiado",
    noResults: "Sin resultados",
    noResultsSub: "Prueba con otra categoría o búsqueda.",
    remainH: "h restantes",
    remainD: "d restantes",
    dealCount: n => `${n} oferta${n !== 1 ? "s" : ""}`,
    couponValidFor: "⏱ Válido por:",
    couponExpired: "⚠️ Cupón expirado",
    /* Pagination */
    prevPage: "← Anterior",
    nextPage: "Siguiente →",
    pageOf: (p, t) => `Página ${p} de ${t}`,
    /* How it works */
    howEyebrow: "Guía rápida",
    howTitle: "¿Cómo funciona AhorraMásUSA?",
    howItems: [
      {
        q: "¿Qué son los cupones de descuento?",
        a: "Los cupones son códigos especiales que ingresas al momento del pago en la tienda para obtener un precio reducido. Están disponibles por tiempo limitado, ¡así que aprovéchalos antes de que expiren!"
      },
      {
        q: "¿Cómo uso un cupón?",
        a: 'Haz clic en "Ver oferta" para ir a la tienda, agrega el producto al carrito y en el paso de pago pega el código del cupón. El descuento se aplicará automáticamente sobre el total.'
      },
      {
        q: "¿Con qué frecuencia se actualizan las ofertas?",
        a: "Actualizamos las ofertas regularmente. Sin embargo, los precios pueden cambiar en la tienda sin aviso previo. Siempre verifica el precio final antes de completar tu compra."
      },
      {
        q: "¿Este sitio cobra algo por usarlo?",
        a: "No. AhorraMásUSA es completamente gratuito para los compradores. Ganamos una pequeña comisión de las tiendas cuando realizas una compra a través de nuestros links, sin ningún costo extra para ti."
      },
      {
        q: "¿Cómo recibo notificaciones de las mejores ofertas?",
        a: "Únete a nuestro grupo de WhatsApp para recibir notificaciones instantáneas de las mejores deals, cupones exclusivos y ofertas flash — totalmente gratis."
      },
    ],
    /* WhatsApp */
    waJoin: "Únete al grupo",
    waTooltip: "🔔 Recibe ofertas en WhatsApp",
    waLink: "https://chat.whatsapp.com/XXXXXX_ESPANOL",
    /* Footer */
    footerText: "Sitio de afiliados. Los precios pueden variar al momento de la compra.",
    footerSub: "Participamos en el Programa de Afiliados de Amazon Services LLC y otros programas de afiliados.",
    /* Misc */
    storeLabel: "Tienda",
    errorTitle: "Error al cargar",
    errorHint: "Verifica que en tu Google Sheet hayas hecho:<br><strong>Archivo → Compartir → Publicar en la web</strong><br>→ Selecciona la hoja → formato CSV → Publicar",
    badgeLabels: { hot: "🔥 HOT", new: "✨ NUEVO", limited: "⏰ LIMITADO", sale: "💸 OFERTA" },
  },

  en: {
    appName: "SaveMoreDeals",
    logoSrc: "images/logo-en.png",
    pageTitle: "SaveMoreDeals — Best Deals of the Day",
    searchPlaceholder: "🔍 Search deals…",
    heroBadge: "🟢 Auto-updated · ",
    heroDeals: "deals",
    heroH1: 'Best deals<br/><span class="hero-h1-accent">of the day</span>',
    heroSub: "Verified deals on tech, gaming, home & more. Links go straight to the store.",
    heroSearch: "🔍 Search all deals…",
    disclosureText: 'ℹ️ <strong>Notice:</strong> This site contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.',
    catAll: "🌟 All",
    catTec: "💻 Tech",
    catGaming: "🎮 Gaming",
    catHogar: "🏠 Home",
    catModa: "👗 Fashion",
    catDeportes: "⚽ Sports",
    catBelleza: "💄 Beauty",
    catOtros: "📦 Other",
    sectionTitle: "🔥 All Deals",
    loading: "Loading deals from Google Sheets…",
    seeOffer: "🛒 See deal →",
    seePrice: "See price →",
    couponLabel: "Coupon",
    copyBtn: "Copy",
    copied: "✓ Copied",
    noResults: "No results",
    noResultsSub: "Try a different category or search term.",
    remainH: "h left",
    remainD: "d left",
    dealCount: n => `${n} deal${n !== 1 ? "s" : ""}`,
    couponValidFor: "⏱ Valid for:",
    couponExpired: "⚠️ Coupon expired",
    prevPage: "← Prev",
    nextPage: "Next →",
    pageOf: (p, t) => `Page ${p} of ${t}`,
    howEyebrow: "Quick guide",
    howTitle: "How does SaveMoreDeals work?",
    howItems: [
      {
        q: "What are coupon codes?",
        a: "Coupon codes are special discount codes you enter at checkout to get a reduced price. They are only valid for a limited time — grab them fast before they expire!"
      },
      {
        q: "How do I use a coupon code?",
        a: 'Click "See deal" to go to the store, add the product to your cart, then paste the coupon code at checkout. The discount will be applied automatically to your order total.'
      },
      {
        q: "How often are deals updated?",
        a: "We update deals regularly. However, prices can change at the store without notice. Always verify the final price before completing your purchase."
      },
      {
        q: "Does this site charge anything?",
        a: "No. SaveMoreDeals is completely free for shoppers. We earn a small commission from stores when you make a purchase through our links, at absolutely no extra cost to you."
      },
      {
        q: "How can I get notified about the best deals in real time?",
        a: "Join our WhatsApp group to receive instant notifications about the best deals, exclusive coupons, and flash sales — completely free."
      },
    ],
    waJoin: "Join the group",
    waTooltip: "🔔 Get deals on WhatsApp",
    waLink: "https://chat.whatsapp.com/XXXXXX_ENGLISH",
    footerText: "Affiliate site. Prices may vary at the time of purchase.",
    footerSub: "We participate in the Amazon Services LLC Associates Program and other affiliate programs.",
    storeLabel: "Store",
    errorTitle: "Error loading",
    errorHint: "Verify that in your Google Sheet you have done:<br><strong>File → Share → Publish to web</strong><br>→ Select the sheet → CSV format → Publish",
    badgeLabels: { hot: "🔥 HOT", new: "✨ NEW", limited: "⏰ LIMITED", sale: "💸 SALE" },
  },
};

/* ── LANGUAGE STATE ──────────────────────────────────────── */
let currentLang = detectLang();

function detectLang() {
  const saved = localStorage.getItem("ds_lang");
  if (saved && I18N[saved]) return saved;
  const browser = (navigator.language || "es").toLowerCase();
  return browser.startsWith("en") ? "en" : "es";
}

function t(key) {
  const val = I18N[currentLang][key];
  return val !== undefined ? val : (I18N["es"][key] ?? key);
}

function applyLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem("ds_lang", lang);
  document.documentElement.lang = lang;

  const L = I18N[lang];

  // Page title
  document.title = L.pageTitle;
  const pageTitleEl = document.getElementById("pageTitle");
  if (pageTitleEl) pageTitleEl.textContent = L.pageTitle;

  // Logo images (header + footer)
  const logoImg = document.getElementById("logoImg");
  if (logoImg) { logoImg.src = L.logoSrc; logoImg.alt = L.appName; }
  const footerLogoImg = document.getElementById("footerLogoImg");
  if (footerLogoImg) { footerLogoImg.src = L.logoSrc; footerLogoImg.alt = L.appName; }

  // textContent
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = L[el.dataset.i18n];
    if (typeof v === "string") el.textContent = v;
  });
  // innerHTML
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = L[el.dataset.i18nHtml];
    if (typeof v === "string") el.innerHTML = v;
  });
  // placeholder
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const v = L[el.dataset.i18nPh];
    if (typeof v === "string") el.placeholder = v;
  });
  // href (WhatsApp)
  document.querySelectorAll("[data-i18n-href]").forEach(el => {
    const v = L[el.dataset.i18nHref];
    if (typeof v === "string") el.href = v;
  });
  // title/tooltip
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const v = L[el.dataset.i18nTitle];
    if (typeof v === "string") el.title = v;
  });

  // Active lang button
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  renderHowItWorks();
  if (allDeals.length) renderDeals();
}

/* ── STORE / CAT / BADGE MAPS ────────────────────────────── */
const STORE_LABELS = {
  "amazon.com": "Amazon", "amzn.to": "Amazon", "a.co": "Amazon",
  "walmart.com": "Walmart", "bestbuy.com": "Best Buy",
  "aliexpress.com": "AliExpress", "ebay.com": "eBay",
  "target.com": "Target", "costco.com": "Costco",
};

const CAT_ICONS = {
  tecnologia: "💻", gaming: "🎮", hogar: "🏠", moda: "👗",
  deportes: "⚽", belleza: "💄", viajes: "✈️", comida: "🍔", otros: "📦",
};

const BADGE_CSS = {
  hot: "badge-hot", new: "badge-new", limited: "badge-limited", sale: "badge-sale",
};

/* ── HELPERS ─────────────────────────────────────────────── */
function isValidUrl(str) {
  try { return ["http:", "https:"].includes(new URL(str).protocol); }
  catch { return false; }
}

function detectStore(url) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    for (const [domain, label] of Object.entries(STORE_LABELS))
      if (host.includes(domain)) return label;
  } catch { /* ignore */ }
  return t("storeLabel");
}

/* ── CSV PARSER ──────────────────────────────────────────── */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h =>
    h.replace(/"/g, "").trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );
  return lines.slice(1).map(line => {
    const values = [];
    let inside = false, cur = "";
    for (const ch of line) {
      if (ch === '"') { inside = !inside; continue; }
      if (ch === "," && !inside) { values.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    values.push(cur.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ""; });
    return row;
  });
}

/* ── FETCH ───────────────────────────────────────────────── */
async function fetchSheet() {
  const res = await fetch(CSV_URL + "&t=" + Date.now());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  if (text.trim().startsWith("<")) throw new Error("SHEET_NOT_PUBLISHED");
  return parseCSV(text);
}

/* ── NORMALIZE ROW → DEAL ────────────────────────────────── */
function normalizeRow(row) {
  const get = (...keys) => {
    for (const k of keys) { const v = row[k]; if (v?.trim()) return v.trim(); }
    return "";
  };

  const url = get("url", "link", "enlace");
  const imagen = get("imagen", "image", "img", "foto");
  const precioStr = get("precio", "price", "precio_actual");
  const antStr = get("precio_anterior", "precio_original", "original_price", "antes");
  const categoria = (get("categoria", "category", "cat").toLowerCase()) || "otros";
  const badge = get("badge", "etiqueta").toLowerCase();
  const activo = get("activo", "active", "visible");
  const expiresH = get("expira_en", "expires_in", "expira", "horas");

  /* ── Bilingual fields ──
     El sheet puede tener columnas separadas _en / _es,
     o columnas genéricas que se usan para ambos idiomas.   */
  const titulo_es = get("titulo_es", "titulo", "nombre", "producto");
  const titulo_en = get("titulo_en") || titulo_es;           // fallback al español si no hay inglés
  const notas_es = get("notas_es", "notas", "descripcion", "desc");
  const notas_en = get("notas_en", "notes", "description") || notas_es;

  /* ── Cupón ── */
  const cupon = get("cupon", "cupon", "coupon", "codigo", "code");
  const expCuponRaw = get("expira_cupon", "expira_coupon", "coupon_expires");

  if (!url || !isValidUrl(url)) return null;
  const isActive = activo
    ? !["no", "false", "0", "inactivo"].includes(activo.toLowerCase()) : true;
  if (!isActive) return null;

  const precio = parseFloat(precioStr.replace(/[$,]/g, "")) || 0;
  const anterior = parseFloat(antStr.replace(/[$,]/g, "")) || 0;
  const descuento = (anterior > precio && precio > 0)
    ? Math.round(((anterior - precio) / anterior) * 100) : 0;

  // Expiry de la oferta
  let expiresAt = null;
  const horas = parseFloat(expiresH);
  if (horas > 0) expiresAt = new Date(Date.now() + horas * 3_600_000);

  // Expiry del cupón
  let cuponExpiresAt = null;
  if (cupon) {
    const horasCupon = parseFloat(expCuponRaw);
    if (horasCupon > 0) cuponExpiresAt = new Date(Date.now() + horasCupon * 3_600_000);
  }

  return {
    url, imagen, precio, anterior, descuento,
    titulo_es, titulo_en,
    notas_es, notas_en,
    categoria: CAT_ICONS[categoria] ? categoria : "otros",
    badge: BADGE_CSS[badge] ? badge : "",
    store: detectStore(url),
    expiresAt, cupon, cuponExpiresAt,
  };
}

/* ── GET LOCALIZED TITLE / NOTES ────────────────────────── */
function dealTitle(deal) {
  return (currentLang === "en" ? deal.titulo_en : deal.titulo_es)
    || `Oferta en ${deal.store}`;
}
function dealNotes(deal) {
  return currentLang === "en" ? deal.notas_en : deal.notas_es;
}

/* ── COUPON COUNTDOWN TIMER ─────────────────────────────── */
let _countdownInterval = null;

function startCountdownTicker() {
  if (_countdownInterval) clearInterval(_countdownInterval);
  _countdownInterval = setInterval(tickCountdowns, 1000);
}

function tickCountdowns() {
  document.querySelectorAll(".coupon-countdown[data-expires]").forEach(el => {
    const exp = parseInt(el.dataset.expires, 10);
    const diff = exp - Date.now();
    if (diff <= 0) {
      el.textContent = t("couponExpired");
      el.classList.add("expired");
      el.removeAttribute("data-expires");
    } else {
      el.textContent = formatCountdown(diff);
    }
  });
}

function formatCountdown(ms) {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const prefix = t("couponValidFor");
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `${prefix} ${d}d ${h % 24}h ${m}m`;
  }
  return `${prefix} ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

/* ── COPY COUPON ─────────────────────────────────────────── */
window.copyDealCoupon = function (e, code) {
  e.preventDefault();
  e.stopPropagation();
  const btn = e.currentTarget;
  const origHTML = btn.innerHTML;

  const success = () => {
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${t("copied")}`;
    btn.classList.add("copied");
    // Ripple animation on parent chip
    const chip = btn.closest(".card-coupon");
    if (chip) {
      chip.classList.add("coupon-flash");
      setTimeout(() => chip.classList.remove("coupon-flash"), 600);
    }
    setTimeout(() => { btn.innerHTML = origHTML; btn.classList.remove("copied"); }, 2200);
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(code).then(success).catch(fallback);
  } else { fallback(); }

  function fallback() {
    try {
      const ta = Object.assign(document.createElement("textarea"), {
        value: code, style: "position:fixed;opacity:0",
      });
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      success();
    } catch { /* silent */ }
  }
};

/* ── SCISSORS SVG ────────────────────────────────────────── */
const SCISSORS_SVG = `<svg class="scissors-icon" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
  <line x1="14.47" y1="14.48" x2="20" y2="20"/>
  <line x1="8.12" y1="8.12" x2="12" y2="12"/>
</svg>`;

const COPY_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <rect x="9" y="9" width="13" height="13" rx="2"/>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
</svg>`;

/* ── BUILD CARD ──────────────────────────────────────────── */
function buildCard(deal, index) {
  const L = I18N[currentLang];
  const badgeLabel = L.badgeLabels[deal.badge];
  const badgeCss = BADGE_CSS[deal.badge];
  const catIcon = CAT_ICONS[deal.categoria] || "📦";
  const catLabel = deal.categoria.charAt(0).toUpperCase() + deal.categoria.slice(1);
  const titulo = dealTitle(deal);
  const notas = dealNotes(deal);

  /* Price */
  const priceHtml = deal.precio > 0
    ? `<div class="card-price-row">
         <span class="price-cur">$${deal.precio.toFixed(2)}</span>
         ${deal.anterior > deal.precio
      ? `<span class="price-was">$${deal.anterior.toFixed(2)}</span>
              <span class="price-off">-${deal.descuento}%</span>` : ""}
       </div>`
    : `<div class="card-price-row"><span class="price-see">${t("seePrice")}</span></div>`;

  /* Deal expiry timer */
  let timerHtml = "";
  if (deal.expiresAt) {
    const diff = deal.expiresAt - Date.now();
    if (diff > 0) {
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      timerHtml = `<div class="card-timer${h < 6 ? " urgent" : ""}">
        ${h < 24 ? `⏰ ${h}h ${m}m ${t("remainH")}` : `📅 ${Math.floor(h / 24)}d ${t("remainD")}`}
      </div>`;
    }
  }

  /* Coupon chip with scissors + countdown */
  let couponHtml = "";
  if (deal.cupon) {
    const safeCode = deal.cupon.replace(/'/g, "\\'").replace(/"/g, "&quot;");
    let countdownHtml = "";
    if (deal.cuponExpiresAt && deal.cuponExpiresAt > Date.now()) {
      const ms = deal.cuponExpiresAt - Date.now();
      const exp = deal.cuponExpiresAt.getTime();
      countdownHtml = `<div class="coupon-countdown" data-expires="${exp}">${formatCountdown(ms)}</div>`;
    } else if (deal.cuponExpiresAt && deal.cuponExpiresAt <= Date.now()) {
      countdownHtml = `<div class="coupon-countdown expired">${t("couponExpired")}</div>`;
    }

    couponHtml = `
      <div class="card-coupon">
        <div class="coupon-top">
          ${SCISSORS_SVG}
          <span class="coupon-label">${t("couponLabel")}:</span>
          <span class="coupon-code">${deal.cupon}</span>
          <button class="coupon-copy"
                  onclick="copyDealCoupon(event,'${safeCode}')"
                  title="${t("copyBtn")}">
            ${COPY_SVG}
            ${t("copyBtn")}
          </button>
        </div>
        ${countdownHtml}
      </div>`;
  }

  const storeEmoji = { Amazon: "📦", Walmart: "🏪", "Best Buy": "💙", AliExpress: "🛒", eBay: "🔨" };
  const emoji = storeEmoji[deal.store] || "🛍️";
  const imgSrc = deal.imagen
    || `https://placehold.co/400x400/10101c/444?text=${encodeURIComponent(emoji)}`;

  const card = document.createElement("a");
  card.className = "card";
  card.href = deal.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer sponsored";
  card.dataset.cat = deal.categoria;
  card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;

  card.innerHTML = `
    <div class="card-img-wrap">
      ${deal.badge && badgeCss
      ? `<span class="card-badge ${badgeCss}">${badgeLabel}</span>` : ""}
      <img class="card-img" src="${imgSrc}" alt="${titulo}" loading="lazy"
           onerror="this.src='https://placehold.co/400x400/10101c/444?text=${encodeURIComponent(emoji)}'" />
      <div class="card-img-overlay"><span>${t("seeOffer").replace("🛒 ", "")}</span></div>
    </div>
    <div class="card-info">
      <div class="card-top">
        <span class="card-store">${deal.store}</span>
        <span class="card-cat">${catIcon} ${catLabel}</span>
      </div>
      <h3 class="card-title">${titulo}</h3>
      ${notas ? `<p class="card-desc">${notas}</p>` : ""}
      ${priceHtml}
      ${couponHtml}
      ${timerHtml}
      <span class="card-cta">${t("seeOffer")}</span>
    </div>`;

  return card;
}

/* ── PAGINATION ──────────────────────────────────────────── */
let currentPage = 1;

function getPageNumbers(current, total) {
  const pages = [];
  let last = 0;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      if (last && i - last > 1) pages.push("…");
      pages.push(i);
      last = i;
    }
  }
  return pages;
}

function renderPagination(total) {
  const pag = document.getElementById("pagination");
  if (!pag) return;
  const totalPages = Math.ceil(total / DEALS_PER_PAGE);
  if (totalPages <= 1) { pag.innerHTML = ""; return; }

  const L = I18N[currentLang];
  let html = "";

  html += `<button class="pag-btn pag-arrow${currentPage === 1 ? " disabled" : ""}"
             id="pagPrev" aria-label="${L.prevPage}">${L.prevPage}</button>`;

  getPageNumbers(currentPage, totalPages).forEach(p => {
    if (p === "…") {
      html += `<span class="pag-ellipsis">…</span>`;
    } else {
      html += `<button class="pag-btn pag-num${p === currentPage ? " active" : ""}"
                 data-page="${p}" aria-label="Página ${p}">${p}</button>`;
    }
  });

  html += `<button class="pag-btn pag-arrow${currentPage === totalPages ? " disabled" : ""}"
             id="pagNext" aria-label="${L.nextPage}">${L.nextPage}</button>`;

  pag.innerHTML = html;

  if (currentPage > 1)
    pag.querySelector("#pagPrev")?.addEventListener("click", () => {
      currentPage--; renderDeals(); scrollToGrid();
    });
  if (currentPage < totalPages)
    pag.querySelector("#pagNext")?.addEventListener("click", () => {
      currentPage++; renderDeals(); scrollToGrid();
    });
  pag.querySelectorAll(".pag-num").forEach(btn =>
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.dataset.page, 10);
      renderDeals(); scrollToGrid();
    })
  );
}

function scrollToGrid() {
  document.querySelector(".section-main")?.scrollIntoView({ behavior: "smooth" });
}

/* ── HOW IT WORKS ────────────────────────────────────────── */
function renderHowItWorks() {
  const container = document.getElementById("howAccordion");
  if (!container) return;
  const L = I18N[currentLang];

  container.innerHTML = L.howItems.map((item, i) => `
    <div class="how-item${i === 0 ? " open" : ""}">
      <button class="how-q" onclick="toggleHow(this)" aria-expanded="${i === 0}">
        <span class="how-q-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="how-q-text">${item.q}</span>
        <svg class="how-chevron" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="how-a"><p>${item.a}</p></div>
    </div>
  `).join("");
}

window.toggleHow = function (btn) {
  const item = btn.closest(".how-item");
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".how-item").forEach(i => {
    i.classList.remove("open");
    i.querySelector(".how-q")?.setAttribute("aria-expanded", "false");
  });
  if (!isOpen) {
    item.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
};

/* ── RENDER DEALS ────────────────────────────────────────── */
let allDeals = [], currentCat = "all", currentSearch = "";

function renderDeals() {
  const grid = document.getElementById("dealsGrid");
  grid.innerHTML = "";

  let filtered = allDeals;
  if (currentCat !== "all")
    filtered = filtered.filter(d => d.categoria === currentCat);
  if (currentSearch)
    filtered = filtered.filter(d =>
      (dealTitle(d) + d.store + d.categoria + dealNotes(d) + d.cupon)
        .toLowerCase().includes(currentSearch)
    );

  const label = document.getElementById("countLabel");
  if (label) {
    const fn = I18N[currentLang].dealCount;
    label.textContent = typeof fn === "function" ? fn(filtered.length) : filtered.length;
  }

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty">
      <div class="empty-icon">🔍</div>
      <h3>${t("noResults")}</h3>
      <p>${t("noResultsSub")}</p>
    </div>`;
    renderPagination(0);
    return;
  }

  const totalPages = Math.ceil(filtered.length / DEALS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * DEALS_PER_PAGE;
  const pageList = filtered.slice(start, start + DEALS_PER_PAGE);

  const frag = document.createDocumentFragment();
  pageList.forEach((d, i) => frag.appendChild(buildCard(d, i)));
  grid.appendChild(frag);

  renderPagination(filtered.length);
  startCountdownTicker();
}

/* ── INIT ────────────────────────────────────────────────── */
async function init() {
  const status = document.getElementById("statusMsg");
  const grid = document.getElementById("dealsGrid");

  grid.innerHTML = Array(6).fill('<div class="skeleton"></div>').join("");

  try {
    const rows = await fetchSheet();
    allDeals = rows.map(normalizeRow).filter(Boolean);

    status.classList.add("hidden");
    grid.innerHTML = "";

    const totalEl = document.getElementById("totalCount");
    if (totalEl) totalEl.textContent = allDeals.length;

    renderDeals();

    /* Category buttons */
    document.querySelectorAll(".cat").forEach(btn =>
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        currentPage = 1;
        renderDeals();
        scrollToGrid();
      })
    );

    /* Search sync */
    const syncSearch = val => {
      currentSearch = val.trim().toLowerCase();
      currentPage = 1;
      renderDeals();
    };

    document.getElementById("searchInput")?.addEventListener("input", e => {
      syncSearch(e.target.value);
      const hero = document.getElementById("heroSearchInput");
      if (hero) hero.value = e.target.value;
    });

    document.getElementById("heroSearchInput")?.addEventListener("input", e => {
      syncSearch(e.target.value);
      const hdr = document.getElementById("searchInput");
      if (hdr) hdr.value = e.target.value;
      scrollToGrid();
    });

    document.getElementById("menuBtn")?.addEventListener("click", () => {
      const s = document.querySelector(".header-search");
      if (s) s.style.display = s.style.display === "block" ? "none" : "block";
    });

  } catch (err) {
    console.error(err);
    grid.innerHTML = "";
    status.className = "status-msg error";
    status.innerHTML = `
      ❌ <strong>${t("errorTitle")}: ${err.message}</strong><br>
      <small style="display:block;margin-top:.5rem;line-height:1.8">${t("errorHint")}</small>`;
  }
}

/* ── BOOT ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach(btn =>
    btn.addEventListener("click", () => applyLang(btn.dataset.lang))
  );
  applyLang(currentLang);
  init();
});
