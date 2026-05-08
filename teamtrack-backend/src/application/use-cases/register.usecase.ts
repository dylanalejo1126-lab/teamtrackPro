import bcrypt from "bcrypt";

import prisma from "../../prisma/client";

import { UsuarioRepository } from "../../domain/usuario.repository";

export class Register {

  constructor(
    private repo: UsuarioRepository
  ) {}

  async ejecutar(data: any) {

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    // CREAR EQUIPO AUTOMÁTICO
    const equipo = await prisma.equipo.create({
      data: {
        nombre: `${data.nombre} Team`,
        descripcion: "Equipo principal"
      }
    });

    // CREAR ADMIN
    return this.repo.crear({

      nombre: data.nombre,

      email: data.email,

      password: hashedPassword,

      rol: "admin",

      equipoId: equipo.id
    });
  }
}