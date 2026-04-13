import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import proyectoRoutes from "./routes/proyecto.routes";
import tareaRoutes from "./routes/tarea.routes";
import usuarioRoutes from "./routes/usuario.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TeamTrack API",
      version: "1.0.0",
      description: "Sistema de gestión de tareas con roles"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Registrar usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  nombre: "Dylan",
                  email: "test@test.com",
                  password: "1234",
                  rol: "admin"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Usuario creado"
            }
          }
        }
      },
      "/auth/login": {
        post: {
          summary: "Login de usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  email: "test@test.com",
                  password: "1234"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Login exitoso"
            }
          }
        }
      },
      "/tareas": {
        get: {
          summary: "Obtener tareas",
          responses: {
            200: {
              description: "Lista de tareas"
            }
          }
        },
        post: {
          summary: "Crear tarea",
          responses: {
            200: {
              description: "Tarea creada"
            }
          }
        }
      },
      "/usuarios": {
        get: {
          summary: "Obtener usuarios",
          responses: {
            200: {
              description: "Lista de usuarios"
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/proyectos", proyectoRoutes);
app.use("/tareas", tareaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("TeamTrack API funcionando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});