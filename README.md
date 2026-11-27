# GAMER-FREE-DEVELOPER · 1.0.3

Portal web estático con experiencia PWA, ilustraciones SVG, navegación por secciones y audio ambiental generado localmente.

## Estructura

- `index.html`: aplicación y metadatos SEO / JSON-LD.
- `assets/css/`: estilos.
- `assets/js/`: navegación y audio.
- `assets/brand/`: logotipo, favicon e iconos PWA.
- `assets/illustrations/`: ilustraciones y vista previa social.
- `manifest.webmanifest`, `sw.js`: instalación y caché offline.
- `robots.txt`, `sitemap.xml`: rastreo e indexación.
- `legal.html`, `offline.html`: privacidad y respaldo sin conexión.

## Ejecución local

Desde esta carpeta: `python -m http.server 8080` y abre `http://localhost:8080`.

## Publicación

Publica el contenido completo en la raíz del dominio configurado. El host SEO conservado en canonical, JSON-LD, robots y sitemap es `https://oficial.gamer.free/`; verifica que sea el dominio final y accesible antes de enviar el sitemap a buscadores.

La verificación de Google se conserva en `google596610175fe7d378.html`. Mantén ese archivo en la raíz pública.
