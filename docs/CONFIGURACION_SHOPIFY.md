# Configuración de Shopify — CuidoMisPies

Este repositorio contiene un tema Shopify Online Store 2.0. La conversión vive en la rama `shopify-mvp`; la rama `main` conserva el prototipo anterior.

## Colecciones y handles

Crear estas colecciones con el handle exacto indicado:

| Colección | Handle |
|---|---|
| Hongos | `hongos` |
| Cuidado del pie en diabetes | `cuidado-pie-diabetes` |
| Talones y piel seca | `talones-piel-seca` |
| Sudor y mal olor | `sudor-mal-olor` |
| Juanetes y dedos | `juanetes-dedos` |
| Callos, roce y presión | `callos-roce-presion` |
| Talón y confort | `talon-confort` |
| Kits por necesidad | `kits` |
| Esenciales | `esenciales` |

Los enlaces de respaldo del encabezado, inicio, pie de página y recomendador usan estos handles.

## Metacampos de producto

En **Configuración → Datos personalizados → Productos**, crear estas definiciones con namespace `cmp`:

| Clave | Tipo Shopify | Uso |
|---|---|---|
| `badge` | Texto de una línea | Etiqueta opcional de tarjeta |
| `short_description` | Texto de una línea | Resumen en tarjetas y ficha |
| `care_level` | Texto de una línea | Antetítulo de la ficha |
| `benefits` | Lista de textos de una línea | Beneficios concretos |
| `how_to_use` | Texto enriquecido | Instrucciones de uso |
| `ingredients` | Texto enriquecido | Ingredientes, material y presentación |
| `precautions` | Texto enriquecido | Precauciones de uso |
| `when_to_consult` | Texto enriquecido | Señales para buscar atención profesional |
| `related_kit` | Referencia a producto | Kit recomendado en la ficha |
| `cross_sell` | Lista de referencias a producto | Complementos, máximo recomendado: 4 |
| `routine_steps` | Lista de textos de una línea | Pasos de un kit |
| `kit_products` | Lista de referencias a producto | Productos incluidos en un kit |

Para los kits, seleccionar la plantilla de producto `kit`. El precio del kit, inventario, variantes y descuento se administran como los de cualquier producto de Shopify.

## Metacampos de colección

En **Configuración → Datos personalizados → Colecciones**, crear:

| Clave | Tipo Shopify | Uso |
|---|---|---|
| `eyebrow` | Texto de una línea | Antetítulo de categoría |
| `educational_content` | Texto enriquecido | Introducción educativa |
| `when_to_consult` | Texto enriquecido | Señales de atención profesional |

## Metaobjects

En **Contenido → Metaobjects**, crear estas definiciones:

### Metaobject `rutina` (para QR postventa y kits)

| Campo | Tipo | Uso |
|---|---|---|
| `name` | Texto de una línea | Nombre de la rutina |
| `need` | Texto de una línea | Necesidad asociada |
| `steps` | Lista de textos | Pasos numerados |
| `precautions` | Texto enriquecido | Precauciones |
| `when_to_consult` | Texto enriquecido | Cuándo pedir orientación |
| `related_products` | Lista de referencias a producto | Productos de la rutina |
| `qr_content` | Texto de una línea | Contenido del QR |

Asociar a productos de kit vía el metafield `cmp.rutina` (tipo: metaobject, referencia a `rutina`).

### Metaobject `faq` (para página de preguntas frecuentes)

| Campo | Tipo | Uso |
|---|---|---|
| `question` | Texto de una línea | Pregunta |
| `answer` | Texto enriquecido | Respuesta |
| `category` | Texto de una línea | Categoría (opcional) |
| `order` | Entero | Orden de visualización |

La sección `cmp-faq` busca este metaobject automáticamente. Crea las entradas en **Contenido → Metaobjects → faq → Ver todo** y se mostrarán en la página `/pages/preguntas-frecuentes`.

Alternativamente, puedes añadir FAQs como blocks desde el editor del tema (sin metaobjects).

## Páginas necesarias

Crear las páginas y asignar los handles indicados:

- Encuentra tu rutina — `encuentra-tu-rutina`; asignar la plantilla `routine-finder`.
- Orientación — `orientacion`; asignar la plantilla `orientacion`.
- Preguntas frecuentes — `preguntas-frecuentes`; asignar la plantilla `faq`.
- Envíos y entregas — `envios-y-entregas`.
- Devoluciones — `devoluciones`.

El recomendador no diagnostica, no envía respuestas a un servidor y muestra una salida de seguridad cuando la persona indica diabetes, mala circulación, pérdida de sensibilidad o señales de alerta.

## Conexión con GitHub

1. Subir la rama `shopify-mvp` a GitHub.
2. En Shopify, abrir **Tienda online → Temas** y conectar el repositorio mediante la integración con GitHub.
3. Seleccionar el repositorio `cenpodmx-ops/cuidomispies` y la rama `shopify-mvp`.
4. Mantener esta rama exclusiva para el tema. Los cambios publicados desde el editor de Shopify pueden sincronizarse hacia la rama conectada.
5. Antes de publicar, abrir **Personalizar** y seleccionar colecciones, imágenes, menús, kit destacado y enlaces de atención.

Alternativamente, cargar el ZIP generado desde **Agregar tema → Cargar archivo ZIP**.

## Revisión antes de publicar

- Configurar pagos, envíos, dominio, impuestos y políticas desde el administrador.
- Confirmar precios, inventario, variantes, pesos y códigos SKU.
- Sustituir las imágenes temporales por las fotografías reales.
- Revisar instrucciones, ingredientes, concentraciones y claims contra las etiquetas reales.
- Probar en celular: navegación, búsqueda, filtros, variantes, carrito, cupones y checkout.
- Realizar una orden de prueba antes de publicar.

## Validación técnica

Ejecutar desde la raíz de la rama:

```powershell
npx --yes @shopify/cli@latest theme check --path .
```

Estado al entregar: 57 archivos inspeccionados, sin errores ni advertencias.
