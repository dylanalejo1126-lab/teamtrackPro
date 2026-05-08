import { Request, Response } from "express";
import { CrearTarea } from "../../application/use-cases/crearTarea.usecase";
import { ObtenerTareas } from "../../application/use-cases/obtenerTareas.usecase";
import { EliminarTarea } from "../../application/use-cases/eliminarTarea.usecase";
import { ActualizarTarea } from "../../application/use-cases/actualizarTarea.usecase";
import { TareaRepositoryImpl } from "../../infrastructure/prisma/tarea.repository.impl";

const repo = new TareaRepositoryImpl();

const crearTareaUseCase = new CrearTarea(repo);
const obtenerTareasUseCase = new ObtenerTareas(repo);
const eliminarTareaUseCase = new EliminarTarea(repo);
const actualizarTareaUseCase = new ActualizarTarea(repo);


export const crearTarea = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).usuario;

    const tarea = await crearTareaUseCase.ejecutar(
      req.body,
      usuario.rol
    );

    res.json(tarea);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const obtenerTareas = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).usuario;

    const tareas = await obtenerTareasUseCase.ejecutar(
  usuario.equipoId
);

    res.json(tareas);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};


export const eliminarTarea = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).usuario;
    const { id } = req.params;

    await eliminarTareaUseCase.ejecutar(Number(id), usuario.rol);

    res.json({ message: "Tarea eliminada" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const actualizarTarea = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).usuario;
    const { id } = req.params;

    const tarea = await actualizarTareaUseCase.ejecutar(
      Number(id),
      req.body,
      usuario.rol
    );

    res.json(tarea);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};