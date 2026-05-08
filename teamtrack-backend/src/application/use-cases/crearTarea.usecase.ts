import { TareaRepository } from "../../domain/tarea.repository";
import { Tarea } from "../../domain/tarea";

export class CrearTarea {
  constructor(private tareaRepo: TareaRepository) {}

  async ejecutar(tarea: Tarea, rol: string) {
    if (rol !== "admin") {
      throw new Error("No tienes permiso");
    }

    return this.tareaRepo.crear(tarea);
  }
}