import { Tarea } from "./tarea";

export interface TareaRepository {
  crear(tarea: Tarea): Promise<Tarea>;
  obtenerPorUsuario(usuarioId: number): Promise<Tarea[]>;
  eliminar(id: number): Promise<void>;
  actualizar(id: number, data: Partial<Tarea>): Promise<Tarea>; // 👈 nuevo
}