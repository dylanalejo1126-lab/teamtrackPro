import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { UsuarioRepository } from "../../domain/usuario.repository";

export class Login {

  constructor(
    private repo: UsuarioRepository
  ) {}

  async ejecutar(
    email: string,
    password: string
  ) {

    try {

      console.log("EMAIL:", email);

      const user = await this.repo.buscarPorEmail(
        email
      );

      console.log("USUARIO DB:", user);

      if (!user) {

        throw new Error(
          "Usuario no encontrado"
        );
      }

      const valid = await bcrypt.compare(
        password,
        user.password
      );

      console.log("COMPARE RESULT:", valid);

      if (!valid) {

        throw new Error(
          "Contraseña incorrecta"
        );
      }

      
      const token = jwt.sign(

        {
          id: user.id,

          email: user.email,

          rol: user.rol,

          equipoId: user.equipoId
        },

        "secreto",

        {
          expiresIn: "1h"
        }
      );

      
      return {

        token,

        usuario: {

          id: user.id,

          nombre: user.nombre,

          email: user.email,

          rol: user.rol,

          equipoId: user.equipoId
        }
      };

    } catch (error) {

      console.log(
        "ERROR LOGIN:",
        error
      );

      throw error;
    }
  }
}