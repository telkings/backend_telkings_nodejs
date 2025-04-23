import User from "../models/User.js";  // Modelo de usuario
import bcrypt from "bcryptjs";      // Para encriptar contraseñas
import jwt from "jsonwebtoken";     // Para generar tokens

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, businessName } = req.body;

    // Verifica si el usuario ya existe
    console.log("Verificando si el usuario existe...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Usuario ya existe.");
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      businessName
    });

    await newUser.save();

    // Generar token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // Enviar respuesta con token y datos del usuario
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        businessName: newUser.businessName
      }
    });
    console.log("Usuario creado con Exito => "+ newUser)
    console.log("Token Enviado => "+ token)
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

// Iniciar sesión (login)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // Enviar token y datos del usuario
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        businessName: user.businessName
      }
    });
    console.log("Devolviendo Usuario "+ user)
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
