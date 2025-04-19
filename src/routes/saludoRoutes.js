import express from "express"; // Usamos import en lugar de require
const router = express.Router();

router.get("/saludo", (req, res) => {
    res.json({ mensaje: "¡Hola desde el backend de Telkings! 🚀" });
    console.log("Estoy devolviendo un saludo al frontend........🚀");
});

// Exportamos con la sintaxis ES Module
export default router;
