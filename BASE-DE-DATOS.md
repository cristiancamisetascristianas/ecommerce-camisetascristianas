# Base de datos · En Tus Manos Estoy

Guía de las tablas en Supabase: qué guarda cada una, cómo se relacionan y cómo se opera.

---

## La idea que explica todo el diseño

En el Excel original, **el precio no pertenece al producto**. Una misma camiseta cuesta:

- $70.000 en 265g talla L
- $80.000 en 265g talla 3XL
- $90.000 en 300g talla L

El precio depende de la combinación `prenda × público × gramaje × talla`. Por eso la base separa dos mundos:

| | Qué es | Ejemplo |
|---|---|---|
| **Las reglas** | La matriz del Excel. La fuente de la verdad. | "Camiseta de hombre, 265g, talla L → $70.000" |
| **El catálogo** | Los diseños reales y lo que se vende de cada uno. | "Gracia · Efesios 2:8, 265g, L, Negro" |

Cuando creas un producto no escribes precios: la base los saca de las reglas. Y subir el precio de todas las camisetas 265g talla XL es **un solo UPDATE**, no tocar producto por producto.

---

## Mapa de tablas

```
CATÁLOGOS BASE (los ejes)
  garment_types ──┐
  audiences ──────┤
  weights ────────┼──→ price_rules          (precio de cada combinación)
  sizes ──────────┤
                  ├──→ weight_sizes         (qué tallas admite cada gramaje)
  colors ─────────┴──→ color_availability   (qué colores existen por prenda+gramaje)

CATÁLOGO REAL
  products ──┬──→ product_variants ──→ colors / weights / sizes
             └──→ product_images

VISTAS (solo lectura)
  products_public · price_matrix · color_matrix
```

---

## Tabla por tabla

### Catálogos base

**`garment_types`** — los tipos de prenda.

| Columna | Qué guarda |
|---|---|
| `code` 🔑 | `camiseta`, `buso_chompa`, `cami_buso` |
| `name` | Nombre para mostrar |
| `notes` | Ej. "Viene con cierre y sin cierre; se indica en la descripción" |
| `sort_order` | Orden de presentación |

**`audiences`** — a quién va dirigida la prenda. Junto con el gramaje y la talla, **determina el precio**.

`nino` · `hombre` · `mujer` · `unisex`

**`weights`** — el gramaje de la tela.

| Columna | Qué guarda |
|---|---|
| `grams` 🔑 | `230`, `265`, `300` |
| `is_oversize` | `true` solo en 300g — el front debe avisarlo al seleccionarlo |
| `notes` | Observaciones de la tela |

**`sizes`** — las tallas, con su orden real.

`6-8` · `10-12` · `14-16` (grupo `nino`) y `S` · `M` · `L` · `XL` · `2XL` · `3XL` (grupo `adulto`)

> El campo `sort_order` existe porque ordenar alfabéticamente pondría `2XL` antes de `L`. **Ordena siempre por `sort_order`, nunca por el código.**

**`colors`** — la paleta completa.

| Columna | Qué guarda |
|---|---|
| `code` | `negro`, `blanco`, `gris`, `beis`, `vainilla`, `arena`, `cafe`, `verde_botella`, `azul_cielo` |
| `name` | Nombre para mostrar |
| `hex` | Color para pintar el círculo en la web |
| `sort_order` | Orden de presentación |

### Las reglas del negocio

**`weight_sizes`** — qué tallas existen para cada gramaje.

| Gramaje | Tallas |
|---|---|
| 230g | 6-8, 10-12, 14-16 |
| 265g | S a 3XL |
| 300g | S a XL |

Es lo que hace que **una camiseta 300g talla 2XL sea rechazada** por la base.

**`price_rules`** — la matriz de precios. **La tabla más importante.**

| Columna | Qué guarda |
|---|---|
| `garment_type_code` | Qué prenda |
| `audience_code` | Qué público |
| `weight_grams` | Qué gramaje (`NULL` = la prenda no distingue gramaje) |
| `size_code` | Qué talla |
| `price_cop` | El precio en pesos |
| `active` | Permite desactivar una regla sin borrarla |

Contenido actual (33 reglas):

| Prenda | Público | Gramaje | Tallas | Precio |
|---|---|---|---|---|
| Camiseta | Niños | 230g | 6-8 a 14-16 | $50.000 |
| Camiseta | Hombre / Mujer | 265g | S a XL | $70.000 |
| Camiseta | Hombre / Mujer | 265g | 2XL a 3XL | $80.000 |
| Camiseta | Hombre / Mujer | 300g *(Oversize)* | S a XL | $90.000 |
| Buso Chompa | Unisex | *pendiente* | S a 3XL | $100.000 |
| Cami Buso | Unisex | *pendiente* | S a XL | $90.000 |

**`color_availability`** — qué colores existen para cada prenda y gramaje.

| Prenda | Gramaje | Colores |
|---|---|---|
| Camiseta | 265g | Negro, Blanco, Gris, Beis, Vainilla, Café, **Verde botella**, Azul cielo |
| Camiseta | 300g | Negro, Blanco, Gris, Beis, Vainilla, **Arena**, Café, Azul cielo |
| Buso Chompa | *pendiente* | Negro, Blanco, Beis, Azul cielo |
| Cami Buso | *pendiente* | Negro, Blanco, Beis, Azul cielo |

La única diferencia entre 265g y 300g es **Verde botella ↔ Arena**.

### El catálogo real

**`products`** — el diseño / estampado. **Un producto NO tiene precio ni talla**: eso vive en las variantes.

| Columna | Qué guarda |
|---|---|
| `id` 🔑 | UUID |
| `slug` | Identificador legible y único: `gracia-efesios-2-8` |
| `name` | Nombre comercial |
| `garment_type_code` → `garment_types` | Sobre qué prenda va el diseño |
| `audience_code` → `audiences` | Público — **define qué precios aplican** |
| `category` | Categoría de navegación del sitio: `hombre`, `mujer`, `nino`, `unisex`, `pareja` |
| `badge` | Etiqueta opcional: "Nuevo", "Más vendida" |
| `short` | Frase corta para la tarjeta |
| `description` | Texto largo del modal |
| `features` | Lista de viñetas (`text[]`) |
| `active` | Si no está activo, no aparece en la web |
| `featured` | Para la sección de destacados |
| `sort_order` | Orden en el catálogo |

> `audience_code` y `category` son distintos a propósito. El primero manda en el **precio**; el segundo en **cómo se navega la web**. Ejemplo: "Ora, Espera, Confía" tiene `audience_code = unisex` (paga precio de cami buso unisex) pero `category = mujer` (aparece en la sección de mujer).

**`product_variants`** — lo que realmente se vende y se cotiza.

| Columna | Qué guarda |
|---|---|
| `product_id` → `products` | De qué diseño es |
| `weight_grams` → `weights` | Gramaje elegido |
| `size_code` → `sizes` | Talla |
| `color_id` → `colors` | Color |
| `price_cop` | **Si lo dejas en NULL, la base lo rellena desde `price_rules`** |
| `sku` | Código propio, opcional |
| `stock` | Inventario |
| `active` | Para ocultar una combinación puntual |

Una camiseta de hombre genera **80 variantes**: 265g (6 tallas × 8 colores) + 300g (4 tallas × 8 colores).

**`product_images`** — las fotos.

| Columna | Qué guarda |
|---|---|
| `product_id` → `products` | De qué diseño |
| `color_id` → `colors` | Opcional: si la foto es de un color específico |
| `url` | URL pública en Supabase Storage |
| `alt` | Texto alternativo |
| `sort_order` | La de `sort_order = 0` es la principal |

---

## Cómo se relacionan

```
products (1) ──────< (N) product_variants
products (1) ──────< (N) product_images

product_variants (N) >── (1) weights
product_variants (N) >── (1) sizes
product_variants (N) >── (1) colors

products (N) >── (1) garment_types
products (N) >── (1) audiences
```

Y del lado de las reglas, `price_rules` y `color_availability` **no se conectan directamente con los productos**: se consultan por la combinación `(garment_type, audience, weight, size)`. Por eso cambiar una regla afecta a todos los productos de golpe.

---

## Lo que la base hace sola

Tres triggers trabajan en cada `INSERT` o `UPDATE` de `product_variants`:

**1. Valida la talla contra el gramaje**

```
Camiseta 300g talla 2XL
→ ERROR: el gramaje 300 no admite la talla 2XL
```

**2. Valida el color contra la prenda y el gramaje**

```
Camiseta 300g color Verde botella
→ ERROR: Verde botella no existe para camiseta en 300g
```

Si una combinación todavía no tiene paleta definida (camiseta 230g), se acepta cualquier color.

**3. Rellena el precio**

Si insertas una variante sin `price_cop`, lo busca en `price_rules`. Si no hay regla, falla con un mensaje claro en vez de guardar un precio nulo.

Además, `updated_at` se actualiza solo en `products`, `product_variants` y `price_rules`.

---

## Funciones

**`generar_variantes(product_id, colores?)`**

Crea de un golpe todas las variantes válidas de un producto, con sus precios.

```sql
select generar_variantes('uuid-del-producto');
-- → 80 (camiseta de hombre: todas las tallas × gramajes × colores)
```

Si omites el segundo parámetro usa **todos los colores disponibles**. Para limitar:

```sql
select generar_variantes('uuid', array[
  (select id from colors where code = 'negro'),
  (select id from colors where code = 'blanco')
]::uuid[]);
```

**`precio_sugerido(prenda, publico, gramaje, talla)`**

Consulta la matriz sin insertar nada.

```sql
select precio_sugerido('camiseta', 'hombre', 300, 'L');  -- → 90000
```

---

## Vistas

**`products_public`** — la que consume el front (`ProductsContext.jsx`). Un renglón por producto con todo ya agregado:

| Columna | Qué trae |
|---|---|
| `price` | El precio **mínimo** — para mostrar "desde $70.000" |
| `price_min` / `price_max` | El rango completo |
| `sizes` | Array de tallas, **ya ordenadas correctamente** |
| `weights` | Array de gramajes disponibles |
| `colors` | JSON con `code`, `name` y `hex` de cada color |
| `images` | Array de URLs ordenadas |

Solo devuelve productos con `active = true`.

> ⚠️ `colors` trae **la unión de todos los colores del producto**. Una camiseta con 265g y 300g devuelve los 9. Si el cliente elige Oversize 300g, Verde botella no debería aparecer: hay que filtrar por el gramaje elegido consultando `color_availability`.

**`price_matrix`** — la matriz del Excel en formato legible.

**`color_matrix`** — la paleta por prenda y gramaje.

---

## Recetas

### Agregar un producto nuevo

```sql
-- 1. El diseño
insert into products (slug, name, garment_type_code, audience_code, category, short, description, features)
values ('nueva-camiseta', 'Nueva Camiseta', 'camiseta', 'hombre', 'hombre',
        'Frase corta', 'Descripción larga', array['Característica 1','Característica 2'])
returning id;

-- 2. Todas sus variantes con precio, desde la matriz
select generar_variantes('<el uuid del paso 1>');

-- 3. La imagen (súbela antes al bucket `productos`)
insert into product_images (product_id, url, alt, sort_order)
values ('<uuid>', 'http://.../storage/v1/object/public/productos/nueva-camiseta/1.jpeg', 'Nueva Camiseta', 0);
```

### Cambiar un precio en todo el catálogo

```sql
-- Todas las camisetas 265g talla XL suben a $75.000
update price_rules set price_cop = 75000
where garment_type_code = 'camiseta' and weight_grams = 265 and size_code = 'XL';

-- Ojo: esto NO actualiza las variantes ya creadas. Para propagarlo:
update product_variants v set price_cop = precio_sugerido(
  p.garment_type_code, p.audience_code, v.weight_grams, v.size_code)
from products p where p.id = v.product_id;
```

### Agregar un color a un gramaje

```sql
insert into colors (code, name, hex, sort_order)
values ('vino', 'Vino tinto', '#6E1423', 10)
on conflict (code) do nothing;

insert into color_availability (garment_type_code, weight_grams, color_id)
select 'camiseta', 265, id from colors where code = 'vino';
```

### Ocultar un producto sin borrarlo

```sql
update products set active = false where slug = 'jesus-king';
```

### Ver la paleta real de un gramaje

```sql
select * from color_matrix;
```

---

## Seguridad (RLS)

Todas las tablas tienen **Row Level Security activo** con una única política: `for select using (true)`.

Eso significa:

- ✅ Cualquiera puede **leer** el catálogo (es una tienda pública)
- ❌ Nadie puede **escribir** con la `anon key`

Para escribir hay que entrar con `service_role`: el SQL Editor de Supabase Studio, un backend, o un panel de administración. La `service_role key` **nunca debe llegar al navegador**.

> RLS no lanza error al bloquear una escritura: filtra a cero filas en silencio. Si un `UPDATE` "funciona" pero nada cambia, casi siempre falta una política.

---

## Storage

Las imágenes viven en el bucket público **`productos`**, organizadas por slug:

```
productos/
  gracia-efesios-2-8/1.jpeg
  yhwh/1.jpeg
  nada-me-faltara/1.jpeg
  ...
```

URL pública:

```
{SUPABASE_URL}/storage/v1/object/public/productos/{slug}/{n}.jpeg
```

Para agregar más fotos a un producto, sube `2.jpeg`, `3.jpeg` al mismo directorio y añade una fila en `product_images` con el `sort_order` correspondiente.

---

## Estado actual

| | |
|---|---|
| Tablas | 11 |
| Vistas | 3 |
| Reglas de precio | 33 |
| Colores | 9 |
| Reglas de disponibilidad de color | 24 |
| Productos | 23 |
| Variantes | 1.184 |
| Imágenes | 23 |

**Por prenda:** 12 camisetas (960 variantes) · 6 busos chompa (144) · 5 cami busos (80)

---

## Pendientes

- **Gramaje de Buso Chompa y Cami Buso.** En el Excel dice "PENDIENTE". Sus reglas de precio están con `weight_grams = NULL`. Cuando se defina, hay que actualizar esas filas, agregar los pares en `weight_sizes` y en `color_availability`.
- **Colores de camiseta 230g** (línea infantil). Sin paleta definida: esa combinación acepta cualquier color por ahora.
- **HEX aproximados.** Los códigos de color se pusieron a ojo para que el círculo se vea bien. Ajustar con las telas reales a la vista.
- **Corte 265g $70.000 / $80.000.** El Excel dice "S-XL = 70 mil" y "XL-3XL = 80 mil"; XL cae en ambos. Se cargó XL en el tramo de $70.000.
- **Filtro de colores por gramaje en el front**, como se explicó en la nota de `products_public`.

---

## Los scripts

En `supabase/migrations/`, en orden:

| Archivo | Qué hace |
|---|---|
| `…_schema.sql` | Tablas, triggers, vistas y RLS |
| `…_seed_matriz.sql` | La matriz de precios del Excel |
| `…_migrar_legacy.sql` | Migra la tabla `products` del modelo anterior (no aplica en base nueva) |
| `…_colores.sql` | Colores y su disponibilidad |
| `…_productos.sql` | Los 23 productos, sus variantes e imágenes |

`supabase/install.sql` junta el esquema, la matriz y los colores para montar una base desde cero de un solo golpe.
