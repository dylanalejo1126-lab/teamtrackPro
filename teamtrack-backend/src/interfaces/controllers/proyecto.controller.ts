import { Request, Response } from "express";

import prisma from "../../prisma/client";

export const crearProyecto = async (
  req: Request,
  res: Response
) => {

  try {

    const usuario = (req as any).usuario;

    
    if (usuario.rol !== "admin") {

      return res.status(403).json({
        error: "No tienes permisos"
      });
    }

    
    const proyecto = await prisma.proyecto.create({

      data: {

        nombre: req.body.nombre,

        descripcion: req.body.descripcion,

        fechaInicio: req.body.fechaInicio,

        fechaFin: req.body.fechaFin,

        equipoId: usuario.equipoId
      }
    });

    res.json(proyecto);

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};

export const obtenerProyectos = async (
  req: Request,
  res: Response
) => {

  try {

    const usuario = (req as any).usuario;

    
    const proyectos = await prisma.proyecto.findMany({

      where: {
        equipoId: usuario.equipoId
      }
    });

    res.json(proyectos);

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};