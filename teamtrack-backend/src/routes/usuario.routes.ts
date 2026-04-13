import { Router } from "express";
import { obtenerUsuarios } from "../controllers/usuario.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verificarToken, obtenerUsuarios);

export default router;