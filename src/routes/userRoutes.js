import express from "express"; // Usamos import en lugar de require
const router = express.Router();

router.get("/register", (req, res) => {
    res.json({ mensaje: "Register! 🚀" });
    console.log("Estoy devolviendo un saludo al frontend........🚀");
});

router.get("/login", (req, res) => {
    res.json({ mensaje: "Login! 🚀" });
    console.log("Estoy devolviendo un saludo al frontend........🚀");
});

// Exportamos con la sintaxis ES Module
export default router;