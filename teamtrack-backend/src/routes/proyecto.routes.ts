import { Router } from "express";

import {
  crearProyecto,
  obtenerProyectos
} from "../interfaces/controllers/proyecto.controller";

import { verificarToken } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  verificarToken,
  crearProyecto
);

router.get(
  "/",
  verificarToken,
  obtenerProyectos
);

export default router;