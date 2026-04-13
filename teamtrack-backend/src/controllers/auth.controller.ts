import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    //  Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol
      }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    rol: user.rol
  },
  "secreto",
  { expiresIn: "1h" }
);

  res.json({
    message: "Login exitoso",
    token
  });
};