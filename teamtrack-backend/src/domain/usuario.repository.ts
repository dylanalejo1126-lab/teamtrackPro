import { Usuario } from "./usuario";

export interface UsuarioRepository {
  crear(data: Usuario): Promise<Usuario>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
}