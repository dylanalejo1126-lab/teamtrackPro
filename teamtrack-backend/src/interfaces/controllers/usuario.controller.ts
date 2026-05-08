import { Request, Response } from "express";

import bcrypt from "bcrypt";

import prisma from "../../prisma/client";


export const obtenerUsuarios = async (
  req: Request,
  res: Response
) => {

  try {

    const usuario = (req as any).usuario;

    
    const usuarios = await prisma.usuario.findMany({

      where: {
        equipoId: usuario.equipoId
      },

      select: {

        id: true,

        nombre: true,

        email: true,

        rol: true
      }
    });

    res.json(usuarios);

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};


export const crearUsuario = async (
  req: Request,
  res: Response
) => {

  try {

    const admin = (req as any).usuario;

    // SOLO ADMINS
    if (admin.rol !== "admin") {

      return res.status(403).json({
        error: "No tienes permisos"
      });
    }

    
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    
    const usuario = await prisma.usuario.create({

      data: {

        nombre: req.body.nombre,

        email: req.body.email,

        password: hashedPassword,

        rol: "usuario",

        
        equipoId: admin.equipoId
      }
    });

    res.json(usuario);

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};