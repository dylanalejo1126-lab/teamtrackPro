import prisma from "../../prisma/client";

import { TareaRepository } from "../../domain/tarea.repository";

import { Tarea } from "../../domain/tarea";

export class TareaRepositoryImpl
implements TareaRepository {

  
  async crear(
    tarea: Tarea
  ): Promise<Tarea> {

    return prisma.tarea.create({
      data: tarea
    });
  }

  
  async obtenerPorUsuario(
    equipoId: number
  ): Promise<Tarea[]> {

    return prisma.tarea.findMany({

      where: {

        proyecto: {
          equipoId: equipoId
        }
      },

      include: {

        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            rol: true
          }
        },

        proyecto: true
      }
    });
  }

  
  async eliminar(
    id: number
  ): Promise<void> {

    await prisma.tarea.delete({
      where: { id }
    });
  }

  
  async actualizar(
    id: number,
    data: Partial<Tarea>
  ): Promise<Tarea> {

    return prisma.tarea.update({

      where: { id },

      data
    });
  }
}