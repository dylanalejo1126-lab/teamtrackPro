import { TareaRepository } from "../../domain/tarea.repository";

export class EliminarTarea {
  constructor(private tareaRepo: TareaRepository) {}

  async ejecutar(id: number, rol: string) {
    if (rol !== "admin") {
      throw new Error("No tienes permiso");
    }

    await this.tareaRepo.eliminar(id);
  }
}