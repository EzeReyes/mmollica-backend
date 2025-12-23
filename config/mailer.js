// config/mailer.js
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "VACÍA");


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,          // o 587
  secure: true,       // true para 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
