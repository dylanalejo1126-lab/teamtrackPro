export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fechaLimite: Date;
  usuarioId: number;
  proyectoId: number;
}