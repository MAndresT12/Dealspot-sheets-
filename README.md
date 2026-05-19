# ⚡ SaveMoreDeals / AhorraMásUSA × Google Sheets — v2.0

El sitio de deals se alimenta 100% de Google Sheets.
Soporta contenido **bilingüe (ES/EN)**, **cupones con contador de tiempo**, y logos intercambiables.

---

## Paso 1 — Estructura del Google Sheet

Ir a [sheets.new](https://sheets.new) para crear una hoja nueva.

### Columnas completas (copia exactamente estos nombres en la fila 1)

| Col | Nombre              | ¿Obligatorio? | Ejemplo                          | Notas                                                          |
|-----|---------------------|--------------|----------------------------------|----------------------------------------------------------------|
| A   | `url`               | ✅ Sí        | `https://amzn.to/43fHTfs`        | Tu link de afiliado                                            |
| B   | `titulo_es`         | Recomendado  | `AirPods Pro 2da Gen`            | Título en **español**                                          |
| C   | `titulo_en`         | Opcional     | `AirPods Pro 2nd Gen`            | Título en **inglés** (si vacío, usa titulo_es)                 |
| D   | `imagen`            | Opcional     | `https://m.media-amazon.com/...` | URL de la imagen del producto                                  |
| E   | `precio`            | Opcional     | `189.99`                         | Solo el número, sin $ ni símbolo                               |
| F   | `precio_anterior`   | Opcional     | `249.99`                         | Calcula el % de descuento automáticamente                       |
| G   | `categoria`         | Opcional     | `tecnologia`                     | Ver opciones abajo ↓                                           |
| H   | `badge`             | Opcional     | `hot`                            | `hot` `new` `limited` `sale`                                   |
| I   | `notas_es`          | Opcional     | `Incluye estuche USB-C`          | Descripción corta en **español**                               |
| J   | `notas_en`          | Opcional     | `Includes USB-C case`            | Descripción corta en **inglés** (si vacío, usa notas_es)       |
| K   | `expira_en`         | Opcional     | `24`                             | Horas hasta que expire la **oferta** (timer visible)           |
| L   | `activo`            | Opcional     | `si`                             | `no` para ocultar sin borrar                                   |
| M   | `cupon`             | Opcional     | `SAVE20`                         | Código de cupón — aparece con botón "Copiar" y tijera          |
| N   | `expira_cupon`      | Opcional     | ``                             | Tiempo hasta que expire cupon |

> 💡 **Lo mínimo que necesitas:** solo la columna `url`. El resto es opcional.

---

### Categorías válidas para columna G
```
tecnologia   gaming   hogar   moda   deportes   belleza   viajes   comida   otros
```

> Los nombres de categoría son slugs internos (siempre en español).
> La traducción al inglés ("Tech", "Home", "Fashion"…) se hace automáticamente.

### Badges válidos para columna H
```
hot   new   limited   sale
```

---

### Ejemplo de hoja completa

| url | titulo_es | titulo_en | imagen | precio | precio_anterior | categoria | badge | notas_es | notas_en | expira_en | activo | cupon | expira_cupon |
|-----|-----------|-----------|--------|--------|-----------------|-----------|-------|----------|----------|-----------|--------|-------|--------------|
| https://amzn.to/43fHTfs | AirPods Pro 2da Gen | AirPods Pro 2nd Gen | https://... | 189.99 | 249.99 | tecnologia | hot | Cancelación de ruido ANC | Active Noise Cancellation | 24 | si | SAVE20 | 48 |
| https://amzn.to/49WhOpt | PlayStation 5 Slim | PlayStation 5 Slim | | 429.99 | 549.99 | gaming | limited | Bundle con DualSense | Bundle with DualSense | 12 | si | | |

---

## Paso 2 — Publicar el Sheet

1. **Archivo → Compartir → Publicar en la web**
2. Selecciona **"Hoja 1"** (o el nombre de tu hoja)
3. Selecciona **"Valores separados por comas (.csv)"**
4. Clic en **"Publicar"** → confirma con "Aceptar"
5. Copia la URL que aparece

---

## Paso 3 — Pegar la URL en app.js

Abre `app.js` y reemplaza en la línea de `CSV_URL`:

```javascript
const CSV_URL = "PEGA_AQUI_TU_URL_DE_GOOGLE_SHEETS_CSV";
```

---

## Paso 4 — Carpeta de imágenes

Pon tus dos logos en la carpeta `images/`:

```
images/
├── logo-es.png   ← Logo con "AhorraMásUSA" (fondo transparente)
└── logo-en.png   ← Logo con "SaveMoreDeals" (fondo transparente)
```

Ver `images/README.md` para especificaciones de tamaño.

---

## Paso 5 — Subir a GitHub Pages

```bash
git init
git add .
git commit -m "Launch SaveMoreDeals / AhorraMásUSA"
git remote add origin https://github.com/TU-USUARIO/savemoredeals.git
git branch -M main
git push -u origin main
```

En GitHub: **Settings → Pages → Branch: main → Save**

---

## Cómo funciona el cupón

1. Agrega el código en la columna `cupon` (ej: `SAVE20`)
2. Si tiene expiry, agrega el tiempo en `expira_cupon` (ej: `48` = 2 días)
3. En la card aparecerá automáticamente:
   - Icono de tijera animado ✂️
   - El código del cupón
   - Botón **Copiar** (copia al portapapeles con animación de confirmación)
   - Contador regresivo en vivo `⏱ Válido por: XXX`

---

## Preguntas frecuentes

**¿Los títulos y notas en inglés son obligatorios?**
No. Si dejas `titulo_en` y `notas_en` vacíos, el sitio mostrará el español en ambos idiomas.

**¿Puedo tener categorías distintas para inglés y español?**
No es necesario — la categoría es un slug interno (`tecnologia`, `gaming`…) y la traducción se hace automáticamente. Solo necesitas una columna `categoria`.

**¿Qué pasa cuando el cupón expira?**
El contador desaparece y se muestra "⚠️ Cupón expirado". El código sigue visible para referencia.

**¿Puedo ocultar un deal sin borrarlo?**
Sí: pon `no` en la columna `activo`.
