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

## Dominio personalizado y DNS

GitHub Pages está configurado para servir este repositorio en `oficial.gamer.free` mediante el archivo `CNAME`. La zona DNS debe tener `oficial` como CNAME hacia `gamerfreedeveloper-cloud.github.io` (o los cuatro registros A oficiales de GitHub Pages). No debe quedar un registro A antiguo apuntando al proveedor anterior. Consulta [`docs/DOMAIN-DNS.md`](docs/DOMAIN-DNS.md) para los valores, la validación HTTPS y el checklist de Search Console.

Después de cambiar DNS, espera la propagación, comprueba que `robots.txt`, `sitemap.xml` y el archivo de verificación de Google devuelvan su contenido real, y activa **Enforce HTTPS** en Settings → Pages cuando GitHub haya emitido el certificado.

## Analítica

Actualmente el proyecto no incluye GA4 ni Google Tag Manager. Si se incorpora medición, debe añadirse el Measurement ID mediante una configuración pública no secreta, actualizarse la política de privacidad y validarse el tráfico en GA4 Realtime/DebugView. Nunca guardes credenciales o secretos en el repositorio.
