import { Router } from "express";
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from "../controllers/tarea.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = Router();


router.post("/", verificarToken, crearTarea);
router.get("/", verificarToken, obtenerTareas);
router.put("/:id", verificarToken, actualizarTarea);
router.delete("/:id", verificarToken, eliminarTarea);

export default router;