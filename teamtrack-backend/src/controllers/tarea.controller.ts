import { Request, Response } from "express";
import prisma from "../prisma/client";

// CREAR TAREA
export const crearTarea = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).usuario;

    console.log("USUARIO DESDE TOKEN:", usuario);

    if (usuario.rol !== "admin") {
      return res.status(403).json({ error: "No tienes permiso" });
    }

    const {
      titulo,
      descripcion,
      estado,
      prioridad,
      fechaLimite,
      usuarioId,
      proyectoId
    } = req.body;

    const tarea = await prisma.tarea.create({
      data: {
        titulo,
        descripcion,
        estado,
        prioridad,
        fechaLimite,
        usuarioId, // 👈 el admin decide a quién asignar
        proyectoId
      }
    });

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

// OBTENER TAREAS DEL USUARIO
export const obtenerTareas = async (req: Request, res: Response) => {
  try {
    const usuarioId = (req as any).usuario?.id;

    if (!usuarioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const tareas = await prisma.tarea.findMany({
      where: {
        usuarioId: usuarioId
      },
      include: {
        usuario: true,
        proyecto: true
      }
    });

    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// ACTUALIZAR TAREA
export const actualizarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tarea = await prisma.tarea.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

// ELIMINAR TAREA
export const eliminarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.tarea.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};