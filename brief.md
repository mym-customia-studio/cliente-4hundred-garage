# Brief — 4 Hundred Garage

> Plantilla: `plantilla-taller-01` (rubro: talleres de detailing / estética / mecánica)
> Estado: **demo para presupuesto** — datos tomados de la ficha de Google y de las piezas de Instagram del cliente.

## Cliente

| Dato | Valor | Confirmado |
|---|---|---|
| Nombre comercial | 4 Hundred Garage | ✅ ficha de Google |
| Rubro | Tienda de accesorios para automóviles + detailing + mecánica ligera | ✅ |
| Dirección | Av. Pres. Arturo Umberto Illia 196, B1669 José C. Paz, Buenos Aires | ✅ |
| Teléfono / WhatsApp | 11 5912-3836 | ✅ |
| Horario | Lunes a sábados de 9:00 a 18:00 | ⚠️ **a confirmar** (Google solo dice "abre a las 9") |
| Email | contacto@4hundredgarage.com | ⚠️ **falta crear la casilla** (el dominio ya existe) |
| Dominio | 4hundredgarage.com — comprado el 29/08/2026 en Cloudflare a nombre de MyM, conectado a Vercel. Sitio en https://www.4hundredgarage.com | ✅ |
| Instagram | @4hundredgarage | ⚠️ **a confirmar el usuario real** |
| Reseñas | 5.0 ★ con 2 opiniones en Google | ✅ |
| Sitio web actual | No tiene (la ficha dice "Agregar sitio web") | ✅ |

## Identidad visual

Tomada de sus propias piezas de Instagram, no inventada:

- **Rojo marca** `#FE0614` — el rojo puro que usa en todas las placas
- **Negro** `#0C0C0D` / superficies `#141417`
- **Blanco** `#FFFFFF`
- **Amarillo acento** `#FFD100` — aparece en las piezas de aceite y bujías
- **Tipografía**: Poppins (800 itálica para titulares, 400/600 para texto). Es lo más cercano en Google Fonts a la geométrica pesada itálica de sus placas.
- **Recursos gráficos suyos que se reutilizaron**: cortes diagonales, la bandera a cuadros, la "hoja" roja, el contorno de neumático.

Todo vive en `assets/css/estilos.css` dentro de `:root`. Para rebrandear se tocan solo esas variables.

## Logo

El logo original (`Logo.jpg`, 3 KB) es un JPG chico con fondo blanco: una parrilla de auto clásico y el nombre en manuscrita. **No sirve para web** (baja resolución, no escala, no funciona sobre fondo negro).

Se rehízo en SVG vectorial jugando con el "4":

- `assets/img/logo.svg` — lockup horizontal: parrilla + `4` en pastilla roja + "HUNDRED / GARAGE"
- `assets/img/isotipo.svg` — solo la parrilla con el 4 (favicon y avatar de redes)

Escala a cualquier tamaño, va sobre fondo claro u oscuro y pesa menos de 1 KB.

## Servicios relevados (de sus 16 piezas de Instagram)

**Detailing** — detailing integral · pulido de carrocería · descontaminación de pintura · pulido de ópticas / limpiafaros · restauración de volante
**Estética y personalización** — polarizado de vidrios · ploteo y wrapping · cambio de luces · accesorios
**Mecánica** — cambio de aceite y filtros · bujías · pastillas de freno · mantenimiento preventivo

## Pendientes antes de publicar

1. Confirmar horario real, email e Instagram.
2. **Multimedia**: las fotos actuales son las placas de Instagram, con texto quemado encima y ~470 px de ancho. Sirven para la demo, no para el sitio final. Se cotiza aparte una sesión de fotos del taller y de 3-4 trabajos terminados (antes/después).
3. ~~Dominio~~ — resuelto: `4hundredgarage.com` en Cloudflare (29/08/2026), conectado a Vercel. Falta crear la casilla `contacto@4hundredgarage.com`.
4. Reseñas: las tres del sitio son textos de muestra. Reemplazar por las 2 reales de Google, o sumar reseñas nuevas antes de publicar.
5. Dato "+400 autos atendidos": es un guiño al nombre, **confirmar con el cliente** o cambiarlo por otro dato real.
