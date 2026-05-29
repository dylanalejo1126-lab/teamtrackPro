import { TareaRepository } from "../../domain/tarea.repository";
import { Tarea } from "../../domain/tarea";

export class ActualizarTarea {

  constructor(
    private tareaRepo: TareaRepository
  ) {}

  async ejecutar(
    id: number,
    data: Partial<Tarea>,
    rol: string
  ) {

    return this.tareaRepo.actualizar(
      id,
      data
    );
  }

}