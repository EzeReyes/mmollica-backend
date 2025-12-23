// validators/contactoValidator.js
import { body } from "express-validator";

export const contactoValidator = [
  body("nombre")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("apellido")
    .optional()
    .trim()
    .escape(),

  body("telefono")
    .optional()
    .trim()
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email inválido")
    .normalizeEmail(),

  body("mensaje")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El mensaje es obligatorio")
];
