import {
  getProyectosApi,
  createProyectoApi
} from "../../infrastructure/api/proyecto.api";

export const obtenerProyectos = async (token) => {
  return await getProyectosApi(token);
};

export const crearProyecto = async (
  data,
  token
) => {
  return await createProyectoApi(data, token);
};