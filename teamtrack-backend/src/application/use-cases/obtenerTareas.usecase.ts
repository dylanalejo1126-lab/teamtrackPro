import { TareaRepository } from "../../domain/tarea.repository";

export class ObtenerTareas {

  constructor(
    private tareaRepo: TareaRepository
  ) {}

  async ejecutar(
    equipoId: number
  ) {

    return this.tareaRepo.obtenerPorUsuario(
      equipoId
    );
  }
}