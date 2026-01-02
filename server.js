import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactoRoutes from "./routes/contacto.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api/contacto", contactoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});