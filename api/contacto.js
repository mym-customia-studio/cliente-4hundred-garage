/* Función serverless de Vercel — envía el formulario por Resend.
   Requiere variables de entorno en Vercel:
     RESEND_API_KEY   clave de la cuenta de Resend de MyM
     MAIL_DESTINO     casilla del cliente (ej. contacto@4hundredgarage.com.ar)
     MAIL_ORIGEN      remitente verificado (ej. web@4hundredgarage.com.ar)
   NUNCA hardcodear claves en este archivo. */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, telefono, email, vehiculo, servicio, mensaje, empresa } = req.body || {};

  if (empresa) return res.status(200).json({ ok: true });               // honeypot
  if (!nombre || !telefono || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const limpio = (v) => String(v || '—').slice(0, 1000)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `
    <h2>Nueva consulta desde la web</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
      <tr><td><b>Nombre</b></td><td>${limpio(nombre)}</td></tr>
      <tr><td><b>Teléfono</b></td><td>${limpio(telefono)}</td></tr>
      <tr><td><b>Email</b></td><td>${limpio(email)}</td></tr>
      <tr><td><b>Vehículo</b></td><td>${limpio(vehiculo)}</td></tr>
      <tr><td><b>Servicio</b></td><td>${limpio(servicio)}</td></tr>
      <tr><td><b>Mensaje</b></td><td>${limpio(mensaje)}</td></tr>
    </table>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `Web 4 Hundred Garage <${process.env.MAIL_ORIGEN}>`,
        to: [process.env.MAIL_DESTINO],
        reply_to: email || undefined,
        subject: `Consulta web — ${limpio(servicio)} — ${limpio(nombre)}`,
        html
      })
    });
    if (!r.ok) throw new Error(await r.text());
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend:', err);
    return res.status(500).json({ error: 'No se pudo enviar el mensaje' });
  }
}
