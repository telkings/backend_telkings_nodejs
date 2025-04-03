require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());// Permite peticiones desde el frontend
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.send("🚀 API de Telkings funcionando!");
});

// Importar rutas
const saludoRoutes = require("./routes/saludo.routes");
app.use("/api", saludoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});









