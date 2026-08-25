# plantilla-taller-01 — Talleres de detailing y personalización

Plantilla multipágina (Plan 2) de **MyM CustomAI Studio**. Primera implementación: 4 Hundred Garage.

## Stack

HTML + CSS + JS puro. Sin frameworks, sin build, sin base de datos. Deploy por push a Vercel.

## Estructura

```
index.html        Home
detailing.html    Detailing (5 servicios + proceso + FAQ)
estetica.html     Polarizado, ploteo, luces, accesorios
mecanica.html     Aceite, bujías, frenos, mantenimiento
galeria.html      Galería completa
contacto.html     Datos, mapa y formulario
assets/css/       estilos.css  (todo el diseño; variables en :root)
assets/js/        main.js      (menú mobile, animaciones, formulario)
assets/img/       fotos + logo.svg + isotipo.svg
api/contacto.js   Función serverless de Vercel → Resend
vercel.json       cleanUrls + cache + headers de seguridad
brief.md          Datos del cliente y pendientes
```

## Rebrandear para otro cliente

1. Copiar la carpeta a `cliente-<nombre>`.
2. Cambiar las variables de `:root` en `assets/css/estilos.css` (paleta y tipografía).
3. Cambiar el diccionario de datos en los HTML (dirección, teléfono, WhatsApp, mail, horario, redes) — están en la barra superior, el footer y la página de contacto.
4. Reemplazar `assets/img/` y `logo.svg` / `isotipo.svg`.
5. Ajustar títulos, `<meta name="description">` y textos de servicios.

## Variables de entorno en Vercel

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Clave de la cuenta de Resend de MyM |
| `MAIL_DESTINO` | Casilla del cliente que recibe las consultas |
| `MAIL_ORIGEN` | Remitente verificado en Resend |

Nunca hardcodear claves en `api/contacto.js`.

## Probar en local

```bash
python -m http.server 8000
```

El formulario solo funciona con `vercel dev` o ya desplegado (necesita la función serverless).

## Accesibilidad y rendimiento

- Contraste AA sobre fondo oscuro; `prefers-reduced-motion` respetado.
- Imágenes con `loading="lazy"` y `alt` descriptivo.
- Navegación por teclado, `aria-current` en el ítem activo, honeypot antispam en el formulario.
