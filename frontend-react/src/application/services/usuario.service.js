import {

  getUsuarios,

  createUsuario

} from "../../infrastructure/api/usuario.api";


export const obtenerUsuarios = async (
  token
) => {

  return await getUsuarios(token);
};


export const crearUsuario = async (
  data,
  token
) => {

  return await createUsuario(
    data,
    token
  );
};