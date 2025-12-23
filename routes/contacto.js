// routes/contacto.js
import express from "express";
import { transporter } from "../config/mailer.js";
import { contactoValidator } from "../validators/contactoValidator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

router.post("/", 
  contactoValidator,
  validarCampos,
  async (req, res) => {
  const { nombre, apellido, email, mensaje, telefono } = req.body;

  try {
    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
      to: "ese.reyes1992@gmail.com", // tu mail real
      subject: "Nuevo contacto desde la web",
      html: `
        <h3>Nuevo mensaje</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Apellido:</strong> ${apellido}</p>
        <p><strong>Telefono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    });

    // 📤 Respuesta automática al cliente
    await transporter.sendMail({
      from: `"MM Mollica" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Hemos recibido su consulta",
      html: `
        <p>Hola ${nombre},</p>
        <p>Gracias por contactarse con <strong>MM Mollica</strong>.</p>
        <p>Hemos recibido su mensaje y nos comunicaremos a la brevedad.</p>
        <br/>
        <p>Atentamente,<br/>Equipo MM Mollica</p>
      `
    });

    res.json({ ok: true, message: "Mensaje enviado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al enviar el mensaje"
    });
  }
});



export default router;
