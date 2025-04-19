import express from "express"; // Usamos import en lugar de require
const router = express.Router();

router.get("/create", (req, res) => {
    res.json({ mensaje: "¡Creando pantalla! 🚀" });
    console.log("Estoy devolviendo un saludo al frontend........🚀");
});

// Exportamos con la sintaxis ES Module
export default router;
