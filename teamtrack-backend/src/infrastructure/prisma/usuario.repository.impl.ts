import prisma from "../../prisma/client";
import { UsuarioRepository } from "../../domain/usuario.repository";
import { Usuario } from "../../domain/usuario";

export class UsuarioRepositoryImpl implements UsuarioRepository {
  async crear(data: Usuario): Promise<Usuario> {
    return prisma.usuario.create({ data });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { email } });
  }
}