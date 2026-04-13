import { Router } from "express";
import { crearProyecto, obtenerProyectos } from "../controllers/proyecto.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", crearProyecto);
router.get("/", verificarToken, obtenerProyectos);

export default router;