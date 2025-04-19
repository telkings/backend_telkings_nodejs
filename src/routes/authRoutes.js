import express from "express";
const router = express.Router();

// Importa los controladores que manejarán la lógica del registro y login
import { registerUser, loginUser } from "../controllers/authController.js";

// Ruta para registrar un nuevo usuario (POST /api/auth/register)
router.post("/register", registerUser);

// Ruta para iniciar sesión (POST /api/auth/login)
 router.post("/login", loginUser);

export default router;


