const express = require("express");
const router = express.Router();

router.get("/saludo", (req, res) => {
    res.json({ mensaje: "¡Hola desde el backend de Telkings! 🚀" });
    console.log("Estoy devolviendo un saludo al frontend........🚀")
});

module.exports = router;
