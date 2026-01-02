import express from "express";
import { contactoValidator } from "../validators/contactoValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();


const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", contactoValidator, validarCampos, async (req, res) => {
  const { nombre, apellido, email, mensaje, telefono } = req.body;

  try {
    // Enviar al administrador
    const { error: adminError } = await resend.emails.send({
      from: "MM Mollica <contacto@mmollica.com.ar>", // usa sandbox hasta verificar dominio
      to: "ese.reyes1992.2@gmail.com",
      subject: "Nuevo contacto desde la web",
      html: `<h3>Nuevo mensaje</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Apellido:</strong> ${apellido}</p>
        <p><strong>Telefono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>`,
    });

    if (adminError) throw adminError;

    // Respuesta automática al cliente
    const { error: clientError } = await resend.emails.send({
      from: "MM Mollica <contacto@mmollica.com.ar>", // usa sandbox hasta verificar dominio
      to: email,
      subject: "Hemos recibido su consulta",
      html: `<p>Hola ${nombre},</p>
        <p>Gracias por contactarse con <strong>MM Mollica</strong>.</p>
        <p>Hemos recibido su mensaje y nos comunicaremos a la brevedad.</p>
        <br/>
        <p>Atentamente,<br/>Equipo MM Mollica</p>`,
    });

    if (clientError) throw clientError;

    res.json({ ok: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al enviar el mensaje", error });
  }
});

export default router;