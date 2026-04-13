import { Request, Response } from "express";
import prisma from "../prisma/client";

// CREAR PROYECTO
export const crearProyecto = async (req: Request, res: Response) => {
  try {
    const proyecto = await prisma.proyecto.create({
      data: req.body
    });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear proyecto" });
  }
};

// OBTENER PROYECTOS
export const obtenerProyectos = async (req: Request, res: Response) => {
  try {
    const proyectos = await prisma.proyecto.findMany();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
};