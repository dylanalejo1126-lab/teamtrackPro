import { Router } from "express";

import {
  obtenerUsuarios,
  crearUsuario
} from "../interfaces/controllers/usuario.controller";

import {
  verificarToken
} from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/",
  verificarToken,
  obtenerUsuarios
);

router.post(
  "/",
  verificarToken,
  crearUsuario
);

export default router;