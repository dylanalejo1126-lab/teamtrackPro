import {

  getTareas,

  createTarea,

  updateTareaApi,

  deleteTareaApi

} from "../../infrastructure/api/tarea.api";


export const obtenerTareas = async (token) => {

  return await getTareas(token);
};


export const crearTarea = async (data, token) => {

  return await createTarea(data, token);
};


export const actualizarTarea = async (

  id,

  data,

  token

) => {

  return await updateTareaApi(

    id,

    data,

    token
  );
};


export const eliminarTarea = async (

  id,

  token

) => {

  return await deleteTareaApi(

    id,

    token
  );
};