#!/usr/bin/env node

import fs from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(process.cwd(), "/"));

let puppeteer;
try {
  puppeteer = require("puppeteer");
} catch {
  console.log(
    "puppeteer is not installed. run:\n  npm install --no-save puppeteer && node assets/generate.mjs",
  );
  process.exit(0);
}

const TOKENS = {
  light: {
    bg: "#ffffff",
    bgMuted: "#f8fafc",
    bgElevated: "#f1f5f9",
    bgAccented: "#e2e8f0",
    bgInverted: "#0f172a",
    textDimmed: "#94a3b8",
    textMuted: "#64748b",
    textToned: "#475569",
    text: "#334155",
    textHighlighted: "#0f172a",
    textInverted: "#ffffff",
    border: "#e2e8f0",
    borderAccented: "#cbd5e1",
    primary: "#3b82f6",
    success: "#059669",
    info: "#0ea5e9",
    warning: "#f59e0b",
    error: "#dc2626",
  },
  dark: {
    bg: "#0f172a",
    bgMuted: "#1e293b",
    bgElevated: "#1e293b",
    bgAccented: "#334155",
    bgInverted: "#ffffff",
    textDimmed: "#64748b",
    textMuted: "#94a3b8",
    textToned: "#cbd5e1",
    text: "#e2e8f0",
    textHighlighted: "#ffffff",
    textInverted: "#0f172a",
    border: "#1e293b",
    borderAccented: "#334155",
    primary: "#60a5fa",
    success: "#34d399",
    info: "#38bdf8",
    warning: "#fbbf24",
    error: "#f87171",
  },
};

const BRAND_GROUND = "#2563eb";

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

function markSVG(color, { size = BOX, label = "75Neo" } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${BOX} ${BOX}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <g stroke="${color}" stroke-width="${W}" stroke-linecap="butt" fill="none">
    <path d="${BRACKET_TL}"/>
    <path d="${BRACKET_BR}"/>
  </g>
</svg>`;
}

const markInline = (color, px) =>
  `<svg width="${px}" height="${px}" viewBox="0 0 ${BOX} ${BOX}" fill="none" aria-hidden="true"><g stroke="${color}" stroke-width="${W}" stroke-linecap="butt" fill="none"><path d="${BRACKET_TL}"/><path d="${BRACKET_BR}"/></g></svg>`;

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

const FRAMEWORKS = [
  {
    name: "React",
    pkg: "@75neo/react",
    color: "#61DAFB",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  },
  {
    name: "Vue",
    pkg: "@75neo/vue",
    color: "#4FC08D",
    path: "M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z",
  },
];

const frameworkIcon = (f, px) =>
  `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="${f.color}" role="img" aria-label="${f.name}"><path d="${f.path}"/></svg>`;

const PATTERN_TILE = 152;

function patternURI(color, opacity) {
  const inset = (PATTERN_TILE - BOX) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PATTERN_TILE}" height="${PATTERN_TILE}" viewBox="0 0 ${PATTERN_TILE} ${PATTERN_TILE}"><g transform="translate(${inset} ${inset})" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${W}" fill="none"><path d="${BRACKET_TL}"/><path d="${BRACKET_BR}"/></g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const BANNER_W = 1280;
const BANNER_H = 360;

function bannerHTML(theme) {
  const t = TOKENS[theme];
  const patternColor = theme === "light" ? "#cbd5e1" : "#334155";

  const cards = FRAMEWORKS.map(
    (f) => `
      <div class="fw" style="--fw:${f.color}">
        <span class="fw__tile">${frameworkIcon(f, 36)}</span>
        <div class="fw__meta"><b>${f.name}</b><code>${f.pkg}</code></div>
      </div>`,
  ).join("");

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${BANNER_W}px;height:${BANNER_H}px;background:${t.bg};overflow:hidden;position:relative;
       -webkit-font-smoothing:antialiased;font-family:'Instrument Sans',system-ui,sans-serif;
       display:flex;align-items:center;gap:56px;padding:0 64px}

  .field{position:absolute;inset:0;background-image:${patternURI(patternColor, 0.6)};
         background-size:${PATTERN_TILE}px ${PATTERN_TILE}px;background-position:-38px -52px;
         opacity:${theme === "light" ? 0.55 : 0.65};
         -webkit-mask-image:radial-gradient(56% 88% at 27% 50%, transparent 0%, transparent 44%, #000 100%)}

  ${WORDMARK_CSS(t)}

  .left{position:relative;z-index:2;display:flex;flex-direction:column;gap:19px;flex:1;min-width:0}
  .lockup{display:flex;align-items:center;gap:13px}
  .lockup svg{flex:none;display:block}
  h1{font-family:'Instrument Sans',sans-serif;font-size:33px;font-weight:600;line-height:1.2;
     letter-spacing:-0.034em;color:${t.textHighlighted};max-width:16ch}
  h1 em{font-style:normal;color:${t.textMuted}}
  .desc{font-size:15.5px;line-height:1.62;color:${t.textMuted};max-width:44ch}

  .frameworks{position:relative;z-index:2;width:588px;flex:none;display:flex;gap:16px}
  .fw{flex:1;display:flex;flex-direction:column;gap:22px;padding:28px;
      background:${t.bg};border:1px solid ${t.border};border-radius:16px;
      box-shadow:0 1px 2px rgba(15,23,42,${theme === "light" ? ".05" : ".4"}),
                 0 18px 40px -24px rgba(15,23,42,${theme === "light" ? ".28" : ".7"})}
  .fw__tile{width:68px;height:68px;border-radius:15px;display:flex;align-items:center;justify-content:center;
            background:${
              theme === "light"
                ? "color-mix(in srgb, var(--fw) 15%, transparent)"
                : "color-mix(in srgb, var(--fw) 11%, #1e293b)"
            };
            border:1px solid color-mix(in srgb, var(--fw) ${theme === "light" ? 36 : 26}%, transparent)}
  .fw__tile svg{display:block}
  .fw__meta{display:flex;flex-direction:column;gap:7px}
  .fw__meta b{font-size:20px;font-weight:600;letter-spacing:-0.022em;line-height:1;color:${t.textHighlighted}}
  .fw__meta code{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:-0.01em;color:${t.textMuted}}
</style></head>
<body>
  <div class="field"></div>

  <div class="left">
    <div class="lockup">${markInline(t.primary, 40)}${wordmark(t, { size: 34 })}</div>
    <h1>One design system.<br><em>Two frameworks.</em></h1>
    <p class="desc">Accessible, token-driven components built on Ark UI and Tailwind CSS. Same API, same tokens, either framework.</p>
  </div>

  <div class="frameworks">${cards}</div>
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

const write = (name, body) => {
  fs.writeFileSync(join(HERE, name), body);
  console.log(`  ${name}`);
};

console.log("\n75Neo — brand assets\n");

console.log("vector");
write("logo.svg", markSVG("currentColor", { label: "75Neo" }));
for (const theme of ["light", "dark"]) {
  write(`logo-${theme}.svg`, markSVG(TOKENS[theme].primary, { label: "75Neo" }));
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const shoot = async (html, { width, height, scale = 2, selector, out, transparent = false }) => {
  const file = join(tmpdir(), `75neo-${out}.html`);
  fs.writeFileSync(file, html);
  const tab = await browser.newPage();
  await tab.setViewport({ width, height, deviceScaleFactor: scale });
  await tab.goto(`file://${file}`, { waitUntil: "networkidle0", timeout: 30000 });
  await tab.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 450));
  const target = selector ? await tab.$(selector) : tab;
  await target.screenshot({ path: resolve(HERE, out), type: "png", omitBackground: transparent });
  await tab.close();
  console.log(`  ${out}`);
};

console.log("\nraster — logo");
const LOGO_RASTERS = [
  { out: "logo-light.png", mark: TOKENS.light.primary, ground: null, mark_px: 448 },
  { out: "logo-dark.png", mark: TOKENS.dark.primary, ground: null, mark_px: 448 },
  { out: "logo-brand.png", mark: "#ffffff", ground: BRAND_GROUND, mark_px: 320 },
];

for (const v of LOGO_RASTERS) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:512px;height:512px;background:transparent}
    #c{width:512px;height:512px;display:flex;align-items:center;justify-content:center;
       background:${v.ground ?? "transparent"}}
    #c svg{width:${v.mark_px}px;height:${v.mark_px}px;display:block}
  </style></head><body><div id="c">${markInline(v.mark, v.mark_px)}</div></body></html>`;
  await shoot(html, {
    width: 512,
    height: 512,
    scale: 1,
    selector: "#c",
    out: v.out,
    transparent: !v.ground,
  });
}

console.log("\nraster — lockup");
for (const theme of ["light", "dark"]) {
  await shoot(lockupHTML(theme), {
    width: 640,
    height: 200,
    selector: "#c",
    out: `lockup-${theme}.png`,
    transparent: true,
  });
}

console.log("\nraster — banner");
for (const theme of ["light", "dark"]) {
  await shoot(bannerHTML(theme), { width: BANNER_W, height: BANNER_H, out: `banner-${theme}.png` });
}

await browser.close();
console.log("\ndone\n");
