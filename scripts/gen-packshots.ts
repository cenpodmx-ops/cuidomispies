// Genera packshots SVG limpios para cada producto del catálogo.
// Estilo: ilustración minimalista sobre fondo marfil, con icono representativo.

import { writeFileSync, mkdirSync } from "fs";

mkdirSync("/home/z/my-project/public/products", { recursive: true });

type PackshotConfig = {
  sku: string;
  type: "bottle-brush" | "tube" | "spray" | "dropper" | "sock" | "protector" | "corrector" | "separator" | "thimble" | "tube-gel" | "ring" | "patch" | "cushion" | "heel" | "insole";
  label: string;
  accent: string;
};

const TEAL = "#176B6B";
const SAGE = "#A9C5B5";
const IVORY = "#FAFAF7";
const GRAPHITE = "#24302F";

const configs: PackshotConfig[] = [
  { sku: "hon-01", type: "bottle-brush", label: "Solución Uñas", accent: TEAL },
  { sku: "hon-02", type: "tube", label: "Crema Pies", accent: TEAL },
  { sku: "hon-03", type: "spray", label: "Spray Calzado", accent: TEAL },
  { sku: "hon-04", type: "dropper", label: "Aceite Té+Neem", accent: TEAL },
  { sku: "dia-01", type: "sock", label: "Calcetín Diabetes", accent: SAGE },
  { sku: "dia-02", type: "tube", label: "Crema Diabetes", accent: SAGE },
  { sku: "sec-01", type: "tube", label: "Urea 20", accent: "#D99C5C" },
  { sku: "sec-02", type: "tube", label: "Urea 40", accent: "#D99C5C" },
  { sku: "sec-03", type: "tube", label: "Urea 60", accent: "#D99C5C" },
  { sku: "sec-04", type: "tube", label: "Crema Dry Skin", accent: "#D99C5C" },
  { sku: "sec-05", type: "spray", label: "Mousse Pies", accent: "#D99C5C" },
  { sku: "sud-01", type: "spray", label: "Antitranspirante", accent: TEAL },
  { sku: "sud-02", type: "spray", label: "Desodorante", accent: TEAL },
  { sku: "jua-01", type: "protector", label: "Protector Juanete", accent: SAGE },
  { sku: "jua-02", type: "corrector", label: "Corrector Noche", accent: SAGE },
  { sku: "jua-03", type: "separator", label: "Separador Gel", accent: SAGE },
  { sku: "jua-04", type: "thimble", label: "Dedal Gel", accent: SAGE },
  { sku: "jua-05", type: "tube-gel", label: "Tubo Protector", accent: SAGE },
  { sku: "roc-01", type: "ring", label: "Anillos Protectores", accent: "#D99C5C" },
  { sku: "roc-02", type: "patch", label: "Protector Punto Gel", accent: "#D99C5C" },
  { sku: "roc-03", type: "cushion", label: "Protector Callos", accent: "#D99C5C" },
  { sku: "con-01", type: "cushion", label: "Almohadilla Metatarsal", accent: TEAL },
  { sku: "con-02", type: "heel", label: "Talonera Impacto", accent: TEAL },
  { sku: "con-03", type: "insole", label: "Talonera Fascitis", accent: TEAL },
];

function svgWrap(content: string, accent: string, label: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${IVORY}"/>
      <stop offset="100%" stop-color="#F3F1EC"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.85"/>
    </linearGradient>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GRAPHITE}" stop-opacity="0.15"/>
      <stop offset="70%" stop-color="${GRAPHITE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <ellipse cx="300" cy="490" rx="180" ry="22" fill="url(#shadow)"/>
  ${content}
  <text x="300" y="555" text-anchor="middle" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="22" font-weight="600" fill="${GRAPHITE}">${label}</text>
</svg>`;
}

function bottleBrush(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 270)">
    <rect x="-80" y="40" width="160" height="170" rx="18" fill="url(#accentGrad)"/>
    <rect x="-80" y="40" width="160" height="170" rx="18" fill="none" stroke="${GRAPHITE}" stroke-opacity="0.15" stroke-width="2"/>
    <rect x="-45" y="10" width="90" height="40" rx="6" fill="${accent}" stroke="${GRAPHITE}" stroke-opacity="0.1"/>
    <rect x="-50" y="-30" width="100" height="45" rx="8" fill="${GRAPHITE}"/>
    <line x1="0" y1="-30" x2="0" y2="-110" stroke="${GRAPHITE}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="0" cy="-115" rx="10" ry="22" fill="${SAGE}"/>
    <rect x="-60" y="100" width="120" height="70" rx="8" fill="${IVORY}" fill-opacity="0.95"/>
    <rect x="-60" y="100" width="120" height="6" rx="3" fill="${accent}"/>
    <line x1="-40" y1="125" x2="40" y2="125" stroke="${GRAPHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="-30" y1="140" x2="30" y2="140" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
    <line x1="-35" y1="155" x2="35" y2="155" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
  </g>
  `, accent, label);
}

function tube(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 280)">
    <path d="M -75 -30 Q -75 -50, -55 -50 L 55 -50 Q 75 -50, 75 -30 L 75 180 Q 75 190, 65 190 L -65 190 Q -75 190, -75 180 Z" fill="url(#accentGrad)"/>
    <path d="M -75 -30 Q -75 -50, -55 -50 L 55 -50 Q 75 -50, 75 -30 L 75 180 Q 75 190, 65 190 L -65 190 Q -75 190, -75 180 Z" fill="none" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2"/>
    <rect x="-55" y="-58" width="110" height="10" rx="3" fill="${accent}" stroke="${GRAPHITE}" stroke-opacity="0.1"/>
    <rect x="-30" y="-100" width="60" height="48" rx="6" fill="${GRAPHITE}"/>
    <ellipse cx="0" cy="-100" rx="30" ry="6" fill="${GRAPHITE}" fill-opacity="0.8"/>
    <rect x="-60" y="20" width="120" height="110" rx="8" fill="${IVORY}" fill-opacity="0.95"/>
    <rect x="-60" y="20" width="120" height="6" rx="3" fill="${accent}"/>
    <line x1="-40" y1="45" x2="40" y2="45" stroke="${GRAPHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="-30" y1="62" x2="30" y2="62" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
    <line x1="-35" y1="78" x2="35" y2="78" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
    <line x1="-25" y1="100" x2="25" y2="100" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
  </g>
  `, accent, label);
}

function spray(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 280)">
    <rect x="-70" y="-20" width="140" height="220" rx="14" fill="url(#accentGrad)"/>
    <rect x="-70" y="-20" width="140" height="220" rx="14" fill="none" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2"/>
    <rect x="-30" y="-45" width="60" height="25" rx="3" fill="${accent}" stroke="${GRAPHITE}" stroke-opacity="0.1"/>
    <path d="M -15 -60 L 15 -60 L 22 -85 L -22 -85 Z" fill="${GRAPHITE}"/>
    <circle cx="0" cy="-80" r="3" fill="${SAGE}"/>
    <rect x="-55" y="40" width="110" height="120" rx="8" fill="${IVORY}" fill-opacity="0.95"/>
    <rect x="-55" y="40" width="110" height="6" rx="3" fill="${accent}"/>
    <line x1="-35" y1="65" x2="35" y2="65" stroke="${GRAPHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="-25" y1="82" x2="25" y2="82" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
    <line x1="-30" y1="98" x2="30" y2="98" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
    <g opacity="0.5">
      <circle cx="-10" cy="-100" r="2" fill="${SAGE}"/>
      <circle cx="10" cy="-105" r="2.5" fill="${SAGE}"/>
      <circle cx="0" cy="-115" r="2" fill="${SAGE}"/>
      <circle cx="-5" cy="-125" r="1.5" fill="${SAGE}"/>
      <circle cx="8" cy="-130" r="2" fill="${SAGE}"/>
    </g>
  </g>
  `, accent, label);
}

function dropper(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 280)">
    <rect x="-65" y="30" width="130" height="160" rx="14" fill="url(#accentGrad)"/>
    <rect x="-65" y="30" width="130" height="160" rx="14" fill="none" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2"/>
    <rect x="-35" y="0" width="70" height="32" rx="4" fill="${accent}" stroke="${GRAPHITE}" stroke-opacity="0.1"/>
    <rect x="-28" y="-45" width="56" height="48" rx="6" fill="${GRAPHITE}"/>
    <line x1="0" y1="0" x2="0" y2="80" stroke="${GRAPHITE}" stroke-width="3" opacity="0.4"/>
    <ellipse cx="0" cy="82" rx="6" ry="8" fill="${accent}" opacity="0.6"/>
    <path d="M 0 95 Q -5 105, 0 115 Q 5 105, 0 95 Z" fill="${accent}"/>
    <rect x="-50" y="80" width="100" height="90" rx="8" fill="${IVORY}" fill-opacity="0.95"/>
    <rect x="-50" y="80" width="100" height="6" rx="3" fill="${accent}"/>
    <line x1="-32" y1="105" x2="32" y2="105" stroke="${GRAPHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="-25" y1="122" x2="25" y2="122" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
    <line x1="-28" y1="138" x2="28" y2="138" stroke="${GRAPHITE}" stroke-opacity="0.3" stroke-width="2"/>
  </g>
  `, accent, label);
}

function sock(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -50 -150 L 50 -150 L 50 30 Q 50 50, 70 70 L 120 110 Q 130 120, 130 140 L 130 170 Q 130 180, 110 180 L -40 180 Q -60 180, -60 160 L -60 -150 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2"/>
    <path d="M -50 -90 L 50 -90" stroke="${accent}" stroke-opacity="0.6" stroke-width="3"/>
    <path d="M -50 -80 L 50 -80" stroke="${GRAPHITE}" stroke-opacity="0.15" stroke-width="1"/>
    <path d="M -50 -140 L 50 -140" stroke="${accent}" stroke-opacity="0.6" stroke-width="3"/>
    <line x1="-50" y1="-30" x2="-60" y2="160" stroke="${GRAPHITE}" stroke-opacity="0.08" stroke-width="2"/>
    <line x1="50" y1="-30" x2="50" y2="30" stroke="${GRAPHITE}" stroke-opacity="0.08" stroke-width="2"/>
  </g>
  `, accent, label);
}

function protector(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -60 -40 Q -60 -60, -40 -60 L 40 -60 Q 60 -60, 60 -40 L 60 80 Q 60 100, 40 100 L 20 100 Q 0 100, 0 80 L 0 -20 Q 0 -30, -10 -30 L -40 -30 Q -60 -30, -60 -10 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <ellipse cx="-30" cy="-45" rx="22" ry="14" fill="${SAGE}" stroke="${GRAPHITE}" stroke-opacity="0.1"/>
    <path d="M -40 -50 Q -45 -55, -38 -58" stroke="${IVORY}" stroke-opacity="0.6" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 30 -50 Q 35 -55, 45 -55" stroke="${IVORY}" stroke-opacity="0.4" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  `, accent, label);
}

function corrector(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <ellipse cx="0" cy="0" rx="90" ry="55" fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2"/>
    <ellipse cx="-30" cy="-15" rx="18" ry="12" fill="${SAGE}"/>
    <path d="M -70 30 Q -90 60, -80 90 Q -70 110, -40 110" stroke="${GRAPHITE}" stroke-opacity="0.4" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 70 30 Q 90 60, 80 90 Q 70 110, 40 110" stroke="${GRAPHITE}" stroke-opacity="0.4" stroke-width="8" fill="none" stroke-linecap="round"/>
    <rect x="-20" y="95" width="40" height="20" rx="4" fill="${GRAPHITE}"/>
    <rect x="-12" y="100" width="24" height="10" rx="2" fill="${accent}"/>
    <ellipse cx="-30" cy="-25" rx="40" ry="15" fill="${IVORY}" fill-opacity="0.25"/>
  </g>
  `, accent, label);
}

function separator(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -30 -110 L 30 -110 L 25 120 Q 25 130, 15 130 L -15 130 Q -25 130, -25 120 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <ellipse cx="-40" cy="0" rx="30" ry="50" fill="${SAGE}" stroke="${GRAPHITE}" stroke-opacity="0.1"/>
    <ellipse cx="-10" cy="-70" rx="8" ry="20" fill="${IVORY}" fill-opacity="0.5"/>
    <ellipse cx="-50" cy="-20" rx="8" ry="20" fill="${IVORY}" fill-opacity="0.4"/>
  </g>
  `, accent, label);
}

function thimble(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -55 120 Q -55 -10, -40 -80 Q -30 -130, 0 -130 Q 30 -130, 40 -80 Q 55 -10, 55 120 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <ellipse cx="0" cy="-125" rx="22" ry="12" fill="${SAGE}"/>
    <path d="M -25 -90 Q -35 -30, -30 60" stroke="${IVORY}" stroke-opacity="0.5" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
  `, accent, label);
}

function tubeGel(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <rect x="-45" y="-130" width="90" height="260" rx="45" fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <line x1="-45" y1="-70" x2="45" y2="-70" stroke="${IVORY}" stroke-width="2" stroke-dasharray="4,4" opacity="0.7"/>
    <line x1="-45" y1="-10" x2="45" y2="-10" stroke="${IVORY}" stroke-width="2" stroke-dasharray="4,4" opacity="0.7"/>
    <line x1="-45" y1="50" x2="45" y2="50" stroke="${IVORY}" stroke-width="2" stroke-dasharray="4,4" opacity="0.7"/>
    <ellipse cx="-18" cy="0" rx="10" ry="100" fill="${IVORY}" fill-opacity="0.3"/>
    <g transform="translate(60, -80)" opacity="0.5">
      <circle cx="0" cy="0" r="8" fill="none" stroke="${GRAPHITE}" stroke-width="2"/>
      <circle cx="0" cy="14" r="8" fill="none" stroke="${GRAPHITE}" stroke-width="2"/>
      <line x1="6" y1="6" x2="30" y2="20" stroke="${GRAPHITE}" stroke-width="2"/>
      <line x1="6" y1="8" x2="30" y2="-6" stroke="${GRAPHITE}" stroke-width="2"/>
    </g>
  </g>
  `, accent, label);
}

function ring(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <ellipse cx="-70" cy="0" rx="55" ry="40" fill="none" stroke="url(#accentGrad)" stroke-width="22"/>
    <ellipse cx="-70" cy="0" rx="55" ry="40" fill="none" stroke="${IVORY}" stroke-width="2" opacity="0.5"/>
    <ellipse cx="20" cy="-40" rx="50" ry="35" fill="none" stroke="${SAGE}" stroke-width="20"/>
    <ellipse cx="20" cy="-40" rx="50" ry="35" fill="none" stroke="${IVORY}" stroke-width="2" opacity="0.5"/>
    <ellipse cx="60" cy="60" rx="45" ry="32" fill="none" stroke="url(#accentGrad)" stroke-width="18"/>
    <ellipse cx="60" cy="60" rx="45" ry="32" fill="none" stroke="${IVORY}" stroke-width="2" opacity="0.5"/>
  </g>
  `, accent, label);
}

function patch(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <rect x="-80" y="-50" width="160" height="100" rx="14" fill="${IVORY}" stroke="${GRAPHITE}" stroke-opacity="0.2" stroke-width="2"/>
    <circle cx="0" cy="0" r="32" fill="url(#accentGrad)" opacity="0.92"/>
    <circle cx="0" cy="0" r="32" fill="none" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2"/>
    <ellipse cx="-10" cy="-10" rx="10" ry="8" fill="${IVORY}" fill-opacity="0.5"/>
    <circle cx="-60" cy="-30" r="3" fill="${accent}" opacity="0.3"/>
    <circle cx="60" cy="-30" r="3" fill="${accent}" opacity="0.3"/>
    <circle cx="-60" cy="30" r="3" fill="${accent}" opacity="0.3"/>
    <circle cx="60" cy="30" r="3" fill="${accent}" opacity="0.3"/>
  </g>
  `, accent, label);
}

function cushion(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -100 -50 Q -100 -70, -80 -70 L 80 -70 Q 100 -70, 100 -50 L 100 50 Q 100 70, 80 70 L -80 70 Q -100 70, -100 50 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <ellipse cx="0" cy="0" rx="70" ry="40" fill="${SAGE}" opacity="0.6"/>
    <ellipse cx="-30" cy="-30" rx="40" ry="15" fill="${IVORY}" fill-opacity="0.4"/>
    <circle cx="-50" cy="-20" r="3" fill="${IVORY}" fill-opacity="0.6"/>
    <circle cx="50" cy="-20" r="3" fill="${IVORY}" fill-opacity="0.6"/>
    <circle cx="-50" cy="20" r="3" fill="${IVORY}" fill-opacity="0.6"/>
    <circle cx="50" cy="20" r="3" fill="${IVORY}" fill-opacity="0.6"/>
  </g>
  `, accent, label);
}

function heel(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -90 -60 Q -90 -80, -70 -80 L 70 -80 Q 90 -80, 90 -60 L 90 60 Q 90 80, 70 80 L 50 80 Q 30 80, 20 60 L 20 -20 Q 20 -30, 10 -30 L -10 -30 Q -20 -30, -20 -20 L -20 60 Q -30 80, -50 80 L -70 80 Q -90 80, -90 60 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <ellipse cx="-55" cy="0" rx="20" ry="35" fill="${SAGE}" opacity="0.7"/>
    <ellipse cx="55" cy="0" rx="20" ry="35" fill="${SAGE}" opacity="0.7"/>
    <ellipse cx="-55" cy="-15" rx="8" ry="15" fill="${IVORY}" fill-opacity="0.5"/>
    <ellipse cx="55" cy="-15" rx="8" ry="15" fill="${IVORY}" fill-opacity="0.5"/>
  </g>
  `, accent, label);
}

function insole(accent: string, label: string): string {
  return svgWrap(`
  <g transform="translate(300, 290)">
    <path d="M -50 -130 Q -50 -150, -30 -150 L 30 -150 Q 50 -150, 50 -130 L 80 100 Q 80 120, 60 120 L -60 120 Q -80 120, -80 100 Z"
      fill="url(#accentGrad)" stroke="${GRAPHITE}" stroke-opacity="0.12" stroke-width="2" opacity="0.92"/>
    <ellipse cx="0" cy="60" rx="45" ry="25" fill="${SAGE}" opacity="0.7"/>
    <ellipse cx="0" cy="100" rx="35" ry="18" fill="${SAGE}" opacity="0.8"/>
    <path d="M -30 -120 Q -40 -60, -30 0" stroke="${IVORY}" stroke-opacity="0.4" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
  `, accent, label);
}

const generators: Record<PackshotConfig["type"], (accent: string, label: string) => string> = {
  "bottle-brush": bottleBrush,
  tube,
  spray,
  dropper,
  sock,
  protector,
  corrector,
  separator,
  thimble,
  "tube-gel": tubeGel,
  ring,
  patch,
  cushion,
  heel,
  insole,
};

for (const c of configs) {
  const svg = generators[c.type](c.accent, c.label);
  writeFileSync(`/home/z/my-project/public/products/${c.sku}.svg`, svg);
}
console.log(`✅ ${configs.length} packshots SVG generados`);
