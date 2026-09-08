import fs from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

let puppeteer;
try {
  puppeteer = (await import("puppeteer")).default;
} catch {
  console.log(
    "puppeteer is not installed. run:\n  npm install --no-save puppeteer && node assets/generate.mjs",
  );
  process.exit(0);
}

const TOKENS = {
  light: {
    bg: "#ffffff",
    bgMuted: "#f5f5f4",
    bgElevated: "#ffffff",
    bgAccented: "#e7e5e4",
    bgInverted: "#1c1917",
    textDimmed: "#a8a29e",
    textMuted: "#57534e",
    textToned: "#44403c",
    text: "#292524",
    textHighlighted: "#1c1917",
    textInverted: "#fafaf9",
    border: "#e7e5e4",
    borderAccented: "#d6d3d1",
    primary: "#2563eb",
    solid: "#1c1917",
    solidText: "#fafaf9",
    soft: "#f5f5f4",
  },
  dark: {
    bg: "#0c0a09",
    bgMuted: "#292524",
    bgElevated: "#1c1917",
    bgAccented: "#44403c",
    bgInverted: "#fafaf9",
    textDimmed: "#78716c",
    textMuted: "#a8a29e",
    textToned: "#d6d3d1",
    text: "#e7e5e4",
    textHighlighted: "#fafaf9",
    textInverted: "#1c1917",
    border: "#292524",
    borderAccented: "#44403c",
    primary: "#60a5fa",
    solid: "#fafaf9",
    solidText: "#1c1917",
    soft: "#292524",
  },
};

const INTENTS = [
  { name: "primary", light: "#1c1917", dark: "#fafaf9" },
  { name: "secondary", light: "#e7e5e4", dark: "#292524" },
  { name: "success", light: "#22c55e", dark: "#22c55e" },
  { name: "info", light: "#3b82f6", dark: "#3b82f6" },
  { name: "warning", light: "#f59e0b", dark: "#f59e0b" },
  { name: "error", light: "#ef4444", dark: "#ef4444" },
];

const BRAND_GROUND = "#2563eb";
const BRAND_CANVAS = 512;
const BRAND_MARK = 320;

const MARK = {
  box: 64,
  weight: 11,
  radius: 13,
  arm: 31,
  tl: 13,
  br: 51,
};

const { radius: R, arm: A, tl: TL, br: BR, weight: W, box: BOX } = MARK;
const BRACKET_TL = `M ${TL} ${TL + A} L ${TL} ${TL + R} A ${R} ${R} 0 0 1 ${TL + R} ${TL} L ${TL + A} ${TL}`;
const BRACKET_BR = `M ${BR} ${BR - A} L ${BR} ${BR - R} A ${R} ${R} 0 0 1 ${BR - R} ${BR} L ${BR - A} ${BR}`;
const MARK_PATHS = `<path d="${BRACKET_TL}"/><path d="${BRACKET_BR}"/>`;

function markSVG(color, { size = BOX, label = "75Neo" } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${BOX} ${BOX}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <g stroke="${color}" stroke-width="${W}" stroke-linecap="butt" fill="none">
    <path d="${BRACKET_TL}"/>
    <path d="${BRACKET_BR}"/>
  </g>
</svg>`;
}

function brandSVG(color, ground, { size = BOX, label = "75Neo" } = {}) {
  const scale = BRAND_MARK / BRAND_CANVAS;
  const inset = (BOX - BOX * scale) / 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${BOX} ${BOX}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="${BOX}" height="${BOX}" fill="${ground}"/>
  <g transform="translate(${inset} ${inset}) scale(${scale})">
    <g stroke="${color}" stroke-width="${W}" stroke-linecap="butt" fill="none">
      <path d="${BRACKET_TL}"/>
      <path d="${BRACKET_BR}"/>
    </g>
  </g>
</svg>`;
}

const markInline = (color, px) =>
  `<svg width="${px}" height="${px}" viewBox="0 0 ${BOX} ${BOX}" fill="none" aria-hidden="true"><g stroke="${color}" stroke-width="${W}" stroke-linecap="butt" fill="none">${MARK_PATHS}</g></svg>`;

const wordmark = (t, { product = true, size = 34 } = {}) => `
  <span class="wm" style="font-size:${size}px">
    <b>75</b><b>Neo</b>${product ? `<i>UI</i>` : ""}
  </span>`;

const WORDMARK_CSS = (t) => `
  .wm{display:inline-flex;align-items:baseline;line-height:1;letter-spacing:-0.035em;
      font-family:'Instrument Sans',system-ui,sans-serif;color:${t.textHighlighted};white-space:nowrap}
  .wm b{font-weight:700}
  .wm i{font-style:normal;font-weight:500;color:${t.textMuted};letter-spacing:-0.02em}
`;

const PATTERN_TILE = 152;

function patternURI(color, opacity = 0.6) {
  const inset = (PATTERN_TILE - BOX) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PATTERN_TILE}" height="${PATTERN_TILE}" viewBox="0 0 ${PATTERN_TILE} ${PATTERN_TILE}"><g transform="translate(${inset} ${inset})" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${W}" fill="none">${MARK_PATHS}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const BANNER_W = 1280;
const BANNER_H = 360;

function bannerHTML(theme) {
  const t = TOKENS[theme];
  const patternColor = theme === "light" ? "#d6d3d1" : "#292524";

  const chips = INTENTS.map(
    (intent) => `<span class="chip" style="--fill:${intent[theme]}"></span>`,
  ).join("");

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${BANNER_W}px;height:${BANNER_H}px;background:${t.bg};overflow:hidden;position:relative;
       -webkit-font-smoothing:antialiased;font-family:'Instrument Sans',system-ui,sans-serif;
       display:flex;align-items:center;gap:48px;padding:0 64px}

  .field{position:absolute;inset:0;background-image:${patternURI(patternColor, 0.6)};
         background-size:${PATTERN_TILE}px ${PATTERN_TILE}px;background-position:-38px -52px;
         opacity:${theme === "light" ? 0.5 : 0.6};
         -webkit-mask-image:radial-gradient(56% 88% at 27% 50%, transparent 0%, transparent 44%, #000 100%)}

  ${WORDMARK_CSS(t)}

  .left{position:relative;z-index:2;display:flex;flex-direction:column;gap:19px;flex:1;min-width:0}
  .lockup{display:flex;align-items:center;gap:13px}
  .lockup svg{flex:none;display:block}
  h1{font-family:'Instrument Sans',sans-serif;font-size:34px;font-weight:600;line-height:1.22;
     letter-spacing:-0.034em;color:${t.textHighlighted};white-space:nowrap}
  h1 em{font-style:normal;color:${t.textMuted}}
  .desc{font-size:15.5px;line-height:1.62;color:${t.textMuted};max-width:52ch}

  .panel{position:relative;z-index:2;width:466px;flex:none;display:flex;flex-direction:column;gap:26px;
         padding:34px;background:${t.bgElevated};border:1px solid ${t.border};border-radius:16px;
         box-shadow:0 1px 3px 0 rgb(0 0 0 / ${theme === "light" ? 0.08 : 0.4})}

  .row{display:flex;align-items:center;gap:10px}
  .btn{height:38px;padding:0 16px;border-radius:6px;display:inline-flex;align-items:center;
       font-size:14px;font-weight:500;letter-spacing:-0.01em;border:1px solid transparent}
  .btn--solid{background:${t.solid};color:${t.solidText}}
  .btn--outline{color:${t.textHighlighted};border-color:${t.borderAccented};background:transparent}
  .btn--soft{background:${t.soft};color:${t.textHighlighted}}

  .field-demo{display:flex;flex-direction:column;gap:8px}
  .field-demo span{font-size:12.5px;font-weight:500;color:${t.textMuted};letter-spacing:-0.005em}
  .field-demo div{height:38px;border-radius:6px;border:1px solid ${t.border};background:${t.bg}}

  .chips{display:flex;gap:9px}
  .chip{width:34px;height:20px;border-radius:5px;background:var(--fill);
        border:1px solid ${theme === "light" ? "rgb(0 0 0 / 0.06)" : "rgb(255 255 255 / 0.08)"}}
</style></head>
<body>
  <div class="field"></div>

  <div class="left">
    <div class="lockup">${markInline(t.primary, 40)}${wordmark(t, { size: 34 })}</div>
    <h1>Components you own.<br><em>Not a dependency you carry.</em></h1>
    <p class="desc">The source lands in your repository and stays yours to edit. One set of design tokens keeps every piece in step, and a single line retints the lot.</p>
  </div>

  <div class="panel">
    <div class="row">
      <span class="btn btn--solid">Primary</span>
      <span class="btn btn--outline">Outline</span>
      <span class="btn btn--soft">Soft</span>
    </div>
    <div class="field-demo"><span>Label</span><div></div></div>
    <div class="chips">${chips}</div>
  </div>
</body></html>`;
}

function lockupHTML(theme) {
  const t = TOKENS[theme];
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;-webkit-font-smoothing:antialiased}
#c{display:inline-flex;align-items:center;gap:14px;padding:16px 20px}
#c svg{flex:none;display:block}
${WORDMARK_CSS(t)}
</style></head><body><div id="c">${markInline(t.primary, 40)}${wordmark(t, { size: 38 })}</div></body></html>`;
}

function writeAsset(name, content) {
  fs.writeFileSync(join(HERE, name), content);
  console.log(`  ${name}`);
}

async function capture(
  browser,
  html,
  { width, height, scale = 2, selector, out, transparent = false },
) {
  const file = join(tmpdir(), `75neo-${out}.html`);
  fs.writeFileSync(file, html);
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: scale });
  await page.goto(`file://${file}`, { waitUntil: "networkidle0", timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 450));
  const target = selector ? await page.$(selector) : page;
  await target.screenshot({ path: resolve(HERE, out), type: "png", omitBackground: transparent });
  await page.close();
  console.log(`  ${out}`);
}

console.log("\n75Neo — brand assets\n");

console.log("vector");
writeAsset("logo.svg", markSVG("currentColor", { label: "75Neo" }));
for (const theme of ["light", "dark"]) {
  writeAsset(`logo-${theme}.svg`, markSVG(TOKENS[theme].primary, { label: "75Neo" }));
}
writeAsset("logo-brand.svg", brandSVG("#ffffff", BRAND_GROUND));

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

console.log("\nraster — logo");
for (const { out, mark, ground, mark_px } of [
  { out: "logo-light.png", mark: TOKENS.light.primary, ground: null, mark_px: 448 },
  { out: "logo-dark.png", mark: TOKENS.dark.primary, ground: null, mark_px: 448 },
  { out: "logo-brand.png", mark: "#ffffff", ground: BRAND_GROUND, mark_px: BRAND_MARK },
]) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${BRAND_CANVAS}px;height:${BRAND_CANVAS}px;background:transparent}
    #c{width:${BRAND_CANVAS}px;height:${BRAND_CANVAS}px;display:flex;align-items:center;justify-content:center;
       background:${ground ?? "transparent"}}
    #c svg{width:${mark_px}px;height:${mark_px}px;display:block}
  </style></head><body><div id="c">${markInline(mark, mark_px)}</div></body></html>`;
  await capture(browser, html, {
    width: BRAND_CANVAS,
    height: BRAND_CANVAS,
    scale: 1,
    selector: "#c",
    out,
    transparent: !ground,
  });
}

console.log("\nraster — lockup");
for (const theme of ["light", "dark"]) {
  await capture(browser, lockupHTML(theme), {
    width: 640,
    height: 200,
    selector: "#c",
    out: `lockup-${theme}.png`,
    transparent: true,
  });
}

console.log("\nraster — banner");
for (const theme of ["light", "dark"]) {
  await capture(browser, bannerHTML(theme), {
    width: BANNER_W,
    height: BANNER_H,
    out: `banner-${theme}.png`,
  });
}

await browser.close();
console.log("\ndone\n");
