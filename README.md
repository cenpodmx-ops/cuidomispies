# CuidoMisPies — Soluciones para cada paso

Ecommerce mexicano de cuidado especializado del pie, dirigido al consumidor final. Traduce necesidades cotidianas del pie (hongos, resequedad, sudor, juanetes, diabetes, etc.) en soluciones comprensibles: productos especializados, kits y rutinas con respaldo profesional.

> **Blueprint integral**: este proyecto implementa fielmente el *Blueprint Integral del Ecommerce CuidoMisPies v1.0* (estrategia de marca, catálogo MVP, oferta, UX y arquitectura técnica).

---

## 📋 Tabla de contenidos

- [Visión del proyecto](#visión-del-proyecto)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Catálogo MVP](#catálogo-mvp)
- [Instalación y arranque](#instalación-y-arranque)
- [Scripts disponibles](#scripts-disponibles)
- [Sistema de diseño de marca](#sistema-de-diseño-de-marca)
- [Arquitectura de datos](#arquitectura-de-datos)
- [Flujos principales](#flujos-principales)
- [Notas regulatorias](#notas-regulatorias)
- [Roadmap](#roadmap)

---

## Visión del proyecto

CuidoMisPies no busca replicar una distribuidora técnica para podólogos ni una farmacia generalista. Su propuesta consiste en **traducir necesidades cotidianas del pie a soluciones comprensibles**, productos especializados, kits y rutinas con respaldo profesional.

### Principio rector

> No vender "catálogo de podología". Vender soluciones de cuidado del pie que una persona pueda descubrir, comprender, comprar y usar sin dominar terminología técnica.

### Fórmula comercial

1. Problema o necesidad cotidiana
2. Explicación sencilla y no diagnóstica
3. Producto principal
4. Complemento relevante
5. Kit o rutina completa
6. Instrucciones claras
7. Orientación profesional cuando sea necesaria
8. Recompra de consumibles

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | **Next.js 16** con App Router |
| Lenguaje | **TypeScript 5** |
| Estilos | **Tailwind CSS 4** + **shadcn/ui** (New York) |
| Base de datos | **Prisma ORM** + SQLite |
| Estado (cliente) | **Zustand** (carrito + navegación SPA) |
| Estado (servidor) | **TanStack Query** (catálogo) |
| Iconos | **lucide-react** |
| Fuentes | Plus Jakarta Sans (display) + Inter (body) |

---

## Estructura del repositorio

```
cuidomispies/
├── prisma/
│   ├── schema.prisma          # Modelo de datos (Category, Product, Kit, Review, Faq, Routine)
│   └── seed.ts                # Seed del catálogo MVP completo
├── public/
│   ├── logo.svg               # Logotipo CuidoMisPies
│   ├── isotipo.svg            # Isotipo independiente
│   └── products/              # 24 packshots SVG (uno por SKU)
├── scripts/
│   └── gen-packshots.ts       # Generador de packshots SVG
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── catalog/route.ts           # GET /api/catalog (todo el catálogo)
│   │   │   └── routine-finder/route.ts    # Quiz "Encuentra tu rutina"
│   │   ├── globals.css                    # Design system + tokens de marca
│   │   ├── layout.tsx                     # Layout raíz con fuentes y metadata
│   │   └── page.tsx                       # Router SPA (Home / Categoría / PDP / Kit / Quiz / Asesoría)
│   ├── components/
│   │   ├── ui/                            # shadcn/ui (botones, diálogos, etc.)
│   │   └── cmp/                           # Componentes CuidoMisPies
│   │       ├── layout/                    # Header, Footer, CartDrawer, SearchOverlay
│   │       ├── home/                      # HomePage con 13 secciones
│   │       ├── views/                     # CategoryView, ProductView, KitView, RoutineFinderView, AsesoriaView
│   │       ├── ProductCard.tsx
│   │       ├── KitCard.tsx
│   │       ├── NeedCard.tsx
│   │       ├── StarRating.tsx
│   │       ├── Badge.tsx
│   │       ├── PriceTag.tsx
│   │       └── icons.tsx                  # Mapa de iconos optimizado
│   └── lib/
│       ├── db.ts                          # Cliente Prisma
│       ├── store.ts                       # Store Zustand (carrito + navegación)
│       ├── use-catalog.ts                 # Hook TanStack Query + helpers
│       ├── query-provider.tsx             # QueryClientProvider
│       ├── types/catalog.ts               # Tipos del dominio + serializadores
│       └── utils.ts                       # Utilidades (cn, etc.)
├── prisma/schema.prisma
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Catálogo MVP

El catálogo inicial prioriza productos con necesidad clara, demostración visual, posibilidad de kit, percepción de especialidad, recompra o potencial de contenido.

### 8 categorías (por necesidad, no por nomenclatura técnica)

| Categoría | Entrada del usuario | Papel comercial |
|-----------|---------------------|-----------------|
| Hongos | Uñas, piel y calzado | Adquisición + recompra |
| Cuidado del pie en diabetes | Protección, hidratación y rutina diaria | Autoridad + multipack |
| Talones y piel seca | Resequedad, piel engrosada, talones | Visual + recompra |
| Sudor y mal olor | Pies y calzado | Problema masivo + recompra |
| Juanetes y dedos | Roce, separación, protección | Descubrimiento + ticket |
| Callos, roce y presión | Protección localizada | Descubrimiento + add-on |
| Talón y confort | Amortiguación y comodidad | Necesidad funcional |
| Cuidado diario | Higiene, mantenimiento y prevención | Cross-sell transversal |

### 24 SKU

Organizados en prefijos: `HON-*` (Hongos), `DIA-*` (Diabetes), `SEC-*` (Piel seca), `SUD-*` (Sudor), `JUA-*` (Juanetes/dedos), `ROC-*` (Roce/presión), `CON-*` (Confort).

### 6 productos héroe

- **HON-01** Solución antifúngica para uñas — adquisición y recompra
- **SEC-02** Urea 40 — visual, fácil de explicar y de recompra
- **JUA-01** Protector + separador para juanete — descubrimiento
- **JUA-05** Tubo protector de gel — "no sabía que esto existía"
- **SUD-01** Antitranspirante para pies — problema cotidiano y recompra
- **DIA-01** Calcetín para personas con diabetes — autoridad, multipack y cuidado preventivo

### 9 kits de rutina

| Kit | Composición | Función |
|-----|-------------|---------|
| Kit Antihongos — Uñas + Calzado | Solución uñas + spray + aceite | Adquisición / rutina |
| Kit Antihongos — Piel + Calzado | Crema + spray + desodorante | Adquisición / rutina |
| Kit Antihongos Completo | Uñas + piel + calzado + complemento | Ticket alto / ancla |
| Talones Intensivo | Urea 40 + crema piel seca | Recompra / visual |
| Talones SOS | Urea 60 + mousse | Premium |
| Pie + Calzado | Antitranspirante + desodorante + spray | Adquisición / recompra |
| Juanete Diario | Protector + separador + corrector nocturno | Descubrimiento / ticket |
| Dedos sin Roce | Dedal + tubo + anillos | Descubrimiento |
| Cuidado Diario Diabetes | Crema + calcetines (1/3/5 pares) | Multipack / recompra |

---

## Instalación y arranque

### Requisitos

- **Node.js** 18+ (o **Bun** 1.0+)
- **npm** o **bun**

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/cenpodmx-ops/cuidomispies.git
cd cuidomispies

# 2. Instalar dependencias
bun install
# o: npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL (SQLite por defecto: file:./db/custom.db)

# 4. Crear la base de datos y aplicar el schema
bun run db:push
# o: npx prisma db push --accept-data-loss

# 5. Generar el cliente de Prisma
bun run db:generate
# o: npx prisma generate

# 6. Cargar el catálogo MVP (seed)
bun run prisma/seed.ts
# o: npx tsx prisma/seed.ts

# 7. Iniciar el servidor de desarrollo
bun run dev
# o: npm run dev

# 8. Abrir http://localhost:3000
```

### Variable de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="file:./db/custom.db"
```

> Si prefieres PostgreSQL o MySQL, cambia el `provider` en `prisma/schema.prisma` y actualiza `DATABASE_URL`.

---

## Scripts disponibles

```bash
bun run dev          # Servidor de desarrollo (http://localhost:3000)
bun run build        # Build de producción
bun run start        # Servidor de producción
bun run lint         # ESLint
bun run db:push      # Aplicar schema a la base de datos
bun run db:generate  # Generar cliente Prisma
bun run db:migrate   # Crear y aplicar migración
bun run db:reset     # Reset completo de la base de datos
```

---

## Sistema de diseño de marca

### Paleta

| Uso | Color | HEX |
|-----|-------|-----|
| Principal | Teal | `#176B6B` |
| Secundario | Verde salvia | `#A9C5B5` |
| Acento cálido | Beige | `#E9DDCE` |
| Fondo | Marfil | `#FAFAF7` |
| Texto | Grafito | `#24302F` |

Los tokens están definidos en `src/app/globals.css` como variables CSS (`--color-cmp-teal`, `--color-cmp-sage`, etc.) y expuestos a Tailwind 4 vía `@theme inline`.

### Personalidad de marca

- Profesional, pero no hospitalaria
- Confiable, pero no rígida
- Especializada, pero fácil de entender
- Moderna, pero no tecnológica en exceso
- Cercana, pero sin perder seriedad
- Limpia y cálida, no fría

### Arquetipo

**Cuidador + Experto**. Cuida, orienta y facilita; al mismo tiempo explica y selecciona con criterio. Se evita la figura del "doctor que regaña" o del especialista que comunica desde una posición inaccesible.

---

## Arquitectura de datos

El modelo de datos refleja los **metafields y metaobjects** que se usarían en Shopify. Esto facilita una futura migración storefront manteniendo la misma estructura de información.

### Metafields de producto (namespace `cmp`)

| Campo | Tipo | Uso |
|-------|------|-----|
| `shortBenefit` | string | Beneficio corto para cards |
| `careLevel` | string | Diario / Intensivo / Extra intensivo |
| `howToUse` | rich text | Uso basado en etiqueta |
| `benefits` | list | 3-4 beneficios |
| `precautions` | rich text | Precauciones |
| `whenToConsult` | rich text | Cuándo pedir orientación |
| `crossSellIds` | list | Complementos |
| `badge` | string | Más vendido / Recomendado / Nuevo / Premium |
| `routineStep` | string | Paso 1/2/3 si participa en rutina |
| `activeIngredient` | string | Ingrediente activo si aplica |

### Metaobjects

- **Routine**: nombre, necesidad, pasos, productos, advertencias y contenido QR
- **FAQ**: pregunta, respuesta, categoría y orden

---

## Flujos principales

### 1. Home (`/`)

Las 13 secciones del blueprint:
1. Hero: "Cuida tus pies como se merecen"
2. Selector de 8 necesidades
3. Kit héroe de temporada
4. Carrusel "Rutinas hechas más simples"
5. "No necesitas saber qué producto buscar"
6. Productos descubrimiento
7. Bloque diabetes
8. Asesoría profesional
9. Más vendidos
10. Contenido educativo
11. Reseñas
12. Newsletter / WhatsApp
13. Footer completo

### 2. Categoría (ej: Hongos)

- Hero + explicación breve
- Bloque educativo
- Kit recomendado
- Sub-selector (Todo / Uñas / Piel / Calzado)
- Grid de productos con filtros
- Kits de la categoría
- CTA hacia asesoría
- FAQ

### 3. Ficha de producto (PDP)

- Galería + packshot
- Compra (precio, cantidad, CTA)
- 3-4 beneficios comprensibles
- Cómo usarlo (según etiqueta)
- Adecuación ("Puede ser útil si...")
- Seguridad (precauciones + cuándo pedir orientación)
- Kit relacionado
- Cross-sell
- Reseñas verificadas

### 4. Página de kit

- Hero con composición y ahorro
- Timeline de pasos de la rutina
- Cómo combinar los productos
- Opción de comprar por separado
- Kits relacionados

### 5. Encuentra tu rutina (Quiz)

Quiz determinístico de 5 preguntas con **lógica de seguridad**: si el usuario reporta señales de riesgo (herida, diabetes con lesión, dolor importante, pérdida de sensibilidad), el resultado cambia de "compra esta rutina" a "recomendamos orientación antes de elegir un producto".

El quiz **no diagnostica**. Las respuestas de salud no se envían a Meta ni a terceros.

### 6. Asesoría

Dos conceptos separados:
- **Ayuda para elegir producto**: dudas sobre el catálogo, kits y recomendaciones
- **Consulta profesional formal**: flujo clínico más estructurado con valoración

---

## Notas regulatorias

Este proyecto es una implementación de referencia. Antes del lanzamiento comercial, validar:

- [ ] **COFEPRIS**: permisos y avisos de publicidad para insumos de salud
- [ ] **Shopify Payments**: elegibilidad para productos regulados (o pasarela alternativa)
- [ ] **Meta**: no enviar datos sensibles de salud vía Pixel/Conversions API
- [ ] **Claims**: verificar etiquetado, registros sanitarios y claims permitidos por SKU
- [ ] **Datos de salud**: minimizar captura de información clínica; si se implementa consulta profesional, tratar como servicio separado con consentimiento y seguridad

> El ecommerce no debe convertir WhatsApp en el único medio de venta. El quiz no debe transformarse en expediente clínico improvisado.

---

## Roadmap

### Sprints del blueprint (referencia)

| Sprint | Foco |
|--------|------|
| 0 | Entorno Dev, repo, skeleton |
| 1 | Design system (tokens, tipografía, botones, cards) |
| 2 | Home completo |
| 3 | Collections (categoría, filtros, sorting) |
| 4 | PDP (galería, variantes, metafields, kit relacionado) |
| 5 | Kits (template, pasos, composición, ahorro) |
| 6 | Cart (drawer, cross-sell, envío gratis) |
| 7 | Routine Finder (quiz, seguridad, resultados) |
| 8 | Content / Advice (aprende, asesoría, legal) |
| 9 | Data / SEO (metafields, structured data, analytics) |
| 10 | QA (mobile, accesibilidad, rendimiento) |
| 11 | Launch (productos reales, precios, dominio, pagos) |

### Estado actual

- ✅ Design system completo
- ✅ Catálogo MVP cargado (8 categorías, 24 SKU, 9 kits)
- ✅ Home con 13 secciones
- ✅ Categoría (modelo Hongos) con sub-selector y FAQ
- ✅ PDP completa
- ✅ Vista de Kit con rutina explicada
- ✅ Quiz "Encuentra tu rutina" con lógica de seguridad
- ✅ Cart drawer con cross-sell y envío gratis
- ✅ Asesoría
- ⏳ Integración con Shopify (siguiente fase)
- ⏳ Pasarela de pagos
- ⏳ Dominio productivo y analítica

---

## Sobre la arquitectura

El blueprint original especifica **Shopify con theme propio** (Liquid/HTML/CSS/JS). Esta implementación en Next.js sirve como:

1. **Prototipo navegable** y realista de toda la tienda
2. **Referencia visual y de UX** para el desarrollo del theme Shopify
3. **Base potencial** para una arquitectura headless futura (Next.js storefront + Shopify backend)

La estructura de componentes (`cmp-*`) y metafields (namespace `cmp`) está alineada con la nomenclatura del blueprint, lo que facilita la migración componente por componente a Liquid.

---

## Licencia

Propietario. © CuidoMisPies. Todos los derechos reservados.

---

**Soluciones para cada paso.**
