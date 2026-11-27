# Dominio, DNS y publicación

## Objetivo

El dominio canónico del proyecto es:

`https://oficial.gamer.free/`

GitHub Pages ya está configurado en el repositorio `gamerfreedeveloper-cloud/gamer-free-developer`, rama `main`, con el dominio personalizado `oficial.gamer.free` y el archivo `CNAME` en la raíz.

## Cambio DNS requerido

La zona DNS autoritativa es `gamer.free` y actualmente `oficial.gamer.free` resuelve a `185.27.134.204`, que no es GitHub Pages. En el proveedor DNS, reemplaza ese registro por **un CNAME**:

| Tipo | Nombre/Host | Destino | TTL |
|---|---|---|---|
| CNAME | `oficial` | `gamerfreedeveloper-cloud.github.io` | Automático o 3600 |

No mantengas simultáneamente un registro A/AAAA para `oficial`. Si el proveedor no permite CNAME en este host, usa los cuatro registros A oficiales de GitHub Pages:

| Tipo | Nombre/Host | Valor |
|---|---|---|
| A | `oficial` | `185.199.108.153` |
| A | `oficial` | `185.199.109.153` |
| A | `oficial` | `185.199.110.153` |
| A | `oficial` | `185.199.111.153` |

No cambies los servidores NS de `gamer.free` ni los registros de correo existentes.

## Validación posterior

Desde una terminal:

```bash
# Debe devolver gamerfreedeveloper-cloud.github.io o las IP 185.199.108-111.153
nslookup oficial.gamer.free

# Debe devolver el contenido real, no una página de desafío ni una redirección inesperada
curl -I https://oficial.gamer.free/
curl -I https://oficial.gamer.free/robots.txt
curl -I https://oficial.gamer.free/sitemap.xml
```

Resultados esperados:

- `https://oficial.gamer.free/` responde `200`.
- `sitemap.xml` responde `200` con `Content-Type: application/xml` o `text/xml`.
- `robots.txt` responde `200` y contiene `Sitemap: https://oficial.gamer.free/sitemap.xml`.
- `google596610175fe7d378.html` devuelve exactamente `google-site-verification: google596610175fe7d378.html`.
- La portada contiene el canonical `https://oficial.gamer.free/`.
- No aparece el desafío JavaScript/AES del proveedor anterior.

## HTTPS en GitHub Pages

Después de que el DNS resuelva de forma consistente a GitHub Pages:

1. Abre **Repository → Settings → Pages**.
2. Comprueba que el dominio personalizado sea `oficial.gamer.free`.
3. Espera a que GitHub valide el certificado.
4. Activa **Enforce HTTPS**.
5. Comprueba que HTTP redirija a HTTPS.

La API de GitHub Pages muestra actualmente el dominio configurado, pero HTTPS todavía no está forzado porque el DNS aún apunta al proveedor anterior.

## Search Console

Usa como propiedad principal:

`https://oficial.gamer.free/`

Después de corregir DNS y HTTPS:

1. Confirma que el sitemap se pueda descargar públicamente.
2. Inspecciona `https://oficial.gamer.free/`.
3. Solicita una prueba de URL en vivo y, si corresponde, una nueva indexación desde Search Console.
4. Mantén el sitemap de producción como único sitemap canónico.

GitHub Pages es el origen de publicación, no una segunda web SEO. No envíes un sitemap con URLs `github.io` que compitan con el dominio canónico.

## Google Analytics

El repositorio no contiene un Measurement ID de GA4 ni etiquetas `gtag.js`/GTM. Antes de incorporar medición:

- Identifica o crea la propiedad GA4 correcta.
- Añade el tag al código.
- Actualiza `legal.html` para informar sobre Analytics, cookies o almacenamiento aplicable.
- Valida eventos en Realtime/DebugView.

No guardes credenciales ni secretos en este repositorio.
