# CLAUDE.md — cliente-4hundred-garage

Sitio del cliente **4 Hundred Garage** (taller de detailing, estética y mecánica ligera en José C. Paz, Buenos Aires). Es un **Plan 2 multipágina** de MyM CustomIA Studio, nacido de la plantilla `plantillas/plan2/multipagina-01-talleres` del repo `mym-base`. Desde que se creó, este repo es 100 % independiente de la plantilla: no se sincroniza ni en un sentido ni en el otro.

## Publicación

- Producción: **https://www.4hundredgarage.com**
- Deploy automático de Vercel al hacer push a `main`. Todo lo que se pushea a `main` sale a producción.
- Dominio `4hundredgarage.com` registrado en Cloudflare a nombre de MyM y conectado a Vercel (detalle en `brief.md`).

## Reglas

1. **Contenido, no estructura.** En este repo se cambia CONTENIDO (textos, fotos, datos de contacto, testimonios). No se cambia ESTRUCTURA (secciones, layout, arquitectura de páginas), salvo indicación explícita de Maxi.
2. **Paleta y tipografías** viven en las variables de `:root` en `assets/css/estilos.css`. Cualquier ajuste de color o fuente se hace ahí, no en reglas sueltas.
3. **Credenciales: nunca en archivos.** Las claves (Resend, etc.) van en variables de entorno de Vercel (`RESEND_API_KEY`, `MAIL_DESTINO`, `MAIL_ORIGEN`). No hardcodear nada en `api/contacto.js` ni en ningún otro archivo.
4. **Idioma:** todo el contenido en español rioplatense, trato de **"vos"** al usuario final.
5. **`brief.md` es la fuente de verdad** de los datos del cliente (dirección, teléfono, horario, email, redes, dominio, pendientes). Cuando cambia un dato, se actualiza el brief además del sitio.
6. **Antes de hacer commit**, listar los archivos modificados y esperar confirmación de Maxi. No commitear ni pushear por cuenta propia.

## Estructura rápida

```
index.html        Home
detailing.html    Detailing (5 servicios + proceso + FAQ)
estetica.html     Polarizado, ploteo, luces, accesorios
mecanica.html     Aceite, bujías, frenos, mantenimiento
galeria.html      Galería completa
contacto.html     Datos, mapa y formulario
assets/css/       estilos.css (variables en :root)
assets/js/        main.js
assets/img/       fotos + logo.svg + isotipo.svg
api/contacto.js   Función serverless de Vercel → Resend
brief.md          Datos del cliente y pendientes
```

Los datos de contacto (dirección, teléfono, WhatsApp, mail, horario, redes) están repetidos en la barra superior, el footer de cada página y `contacto.html`/`index.html`: al cambiar uno, cambiarlo en todos.
