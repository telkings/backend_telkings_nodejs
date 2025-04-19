import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // 👈 Importar conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB(); // 👈 Esto hace la magia de conectar la base de datos

// Middlewares
app.use(cors());// Permite peticiones desde el frontend
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.send("🚀 API de Telkings funcionando!");
});

import saludoRoutes from "./routes/saludoRoutes.js";  // Importa las rutas relacionadas con saludos generales o prueba de la API.
import authRoutes from "./routes/authRoutes.js";      // Importa las rutas de autenticación, como registro y login.
import userRoutes from "./routes/userRoutes.js";      // Importa rutas para operaciones relacionadas con los usuarios (listar, editar, eliminar usuarios, etc).
import screenRoutes from "./routes/screenRoutes.js";  // Importa rutas para manejar pantallas (screens) vinculadas a los usuarios.

// Usar rutas
app.use("/api", saludoRoutes);            // Monta las rutas de saludo en la base "/api", por ejemplo: GET /api/saludo
app.use("/api/auth", authRoutes);         // Monta las rutas de autenticación en "/api/auth", por ejemplo: POST /api/auth/register
app.use("/api/users", userRoutes);        // Monta las rutas de usuarios en "/api/users", por ejemplo: GET /api/users
app.use("/api/screens", screenRoutes);    // Monta las rutas de pantallas en "/api/screens", por ejemplo: POST /api/screens


// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
  });
  









