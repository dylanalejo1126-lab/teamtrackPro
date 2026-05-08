import bcrypt from "bcrypt";

import prisma from "../../prisma/client";

import { UsuarioRepository } from "../../domain/usuario.repository";

export class Register {

  constructor(
    private repo: UsuarioRepository
  ) {}

  async ejecutar(data: any) {

    
    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    
    const equipo = await prisma.equipo.create({
      data: {
        nombre: `${data.nombre} Team`,
        descripcion: "Equipo principal"
      }
    });

    
    return this.repo.crear({

      nombre: data.nombre,

      email: data.email,

      password: hashedPassword,

      rol: "admin",

      equipoId: equipo.id
    });
  }
}