import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from "../../application/services/tarea.service";

import {
  obtenerUsuarios,
  crearUsuario
} from "../../application/services/usuario.service";

import {
  obtenerProyectos,
  crearProyecto
} from "../../application/services/proyecto.service";

import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

function Dashboard() {

  const [vista, setVista] = useState("dashboard");

  const [mostrarModalProyecto, setMostrarModalProyecto] = useState(false);

  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [proyectos, setProyectos] = useState([]);

 
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [proyectoId, setProyectoId] = useState("");

  
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcionProyecto, setDescripcionProyecto] = useState("");

 
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const [tareaEditando, setTareaEditando] = useState(null);

  const [editarTitulo, setEditarTitulo] = useState("");

  const [editarDescripcion, setEditarDescripcion] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  
  const tareasCompletadas = tareas.filter(
    (t) => t.estado === "completada"
  ).length;

  const progreso = tareas.length > 0
    ? Math.round(
        (tareasCompletadas / tareas.length) * 100
      )
    : 0;

  
  const pendientes = tareas.filter(
    (t) => t.estado === "pendiente"
  );

  const progresoTareas = tareas.filter(
    (t) => t.estado === "en progreso"
  );

  const completadas = tareas.filter(
    (t) => t.estado === "completada"
  );

  
  const cargarDatos = async () => {

    const tareasData = await obtenerTareas(token);
    const usuariosData = await obtenerUsuarios(token);
    const proyectosData = await obtenerProyectos(token);

    setTareas(tareasData);
    setUsuarios(usuariosData);
    setProyectos(proyectosData);
  };

  
  const handleCrearProyecto = async () => {

    await crearProyecto({
      nombre: nombreProyecto,
      descripcion: descripcionProyecto,
      fechaInicio: new Date(),
      fechaFin: new Date()
    }, token);

    setNombreProyecto("");
    setDescripcionProyecto("");

    setMostrarModalProyecto(false);

    cargarDatos();
  };

  
  const handleCrearUsuario = async () => {

    await crearUsuario(
      {
        nombre: nombreUsuario,
        email: emailUsuario,
        password: passwordUsuario
      },
      token
    );

    setNombreUsuario("");
    setEmailUsuario("");
    setPasswordUsuario("");

    cargarDatos();
  };

  
  const handleCrearTarea = async () => {

    await crearTarea({
      titulo,
      descripcion,
      estado: "pendiente",
      prioridad: "alta",
      fechaLimite: new Date(),
      usuarioId: Number(usuarioId),
      proyectoId: Number(proyectoId)
    }, token);

    setTitulo("");
    setDescripcion("");
    setUsuarioId("");
    setProyectoId("");

    cargarDatos();
  };


  const cambiarEstado = async (
    id,
    nuevoEstado
  ) => {

    await actualizarTarea(
      id,
      {
        estado: nuevoEstado
      },
      token
    );

    cargarDatos();
  };

  const onDragEnd = async (result) => {

  if (!result.destination) return;

  const tareaId = Number(result.draggableId);

  const nuevoEstado =
    result.destination.droppableId;

  await actualizarTarea(

    tareaId,

    {
      estado: nuevoEstado
    },

    token
  );

  cargarDatos();
};
  
  const handleEliminarTarea = async (id) => {

  const confirmar = window.confirm(
    "¿Eliminar esta tarea?"
  );

  if (!confirmar) return;

  await eliminarTarea(id, token);

  cargarDatos();
};

const abrirEditarTarea = (tarea) => {

  setTareaEditando(tarea);

  setEditarTitulo(tarea.titulo);

  setEditarDescripcion(
    tarea.descripcion
  );

  setMostrarModalEditar(true);
};


const guardarEdicionTarea = async () => {

  await actualizarTarea(

    tareaEditando.id,

    {
      titulo: editarTitulo,
      descripcion: editarDescripcion
    },

    token
  );

  setMostrarModalEditar(false);

  cargarDatos();
};


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        fontFamily: "sans-serif"
      }}
    >

      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #2563eb, #7c3aed)",
          color: "white",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 0 25px rgba(37,99,235,0.2)"
        }}
      >

        <div>

          {/* LOGO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "50px"
            }}
          >

            <img
              src="/logo.png"
              alt="logo"
              style={{
                height: "55px"
              }}
            />

            <div>

              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: 0
                }}
              >
                TeamTrack
              </h1>

              <p
                style={{
                  margin: 0,
                  opacity: 0.8
                }}
              >
                Dashboard
              </p>

            </div>

          </div>

          {/* MENU */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >

            <button
              onClick={() => setVista("dashboard")}
              style={
                vista === "dashboard"
                  ? menuActivo
                  : menuBtn
              }
            >
              Dashboard
            </button>

            <button
              onClick={() => setVista("proyectos")}
              style={
                vista === "proyectos"
                  ? menuActivo
                  : menuBtn
              }
            >
              Proyectos
            </button>

            <button
              onClick={() => setVista("tareas")}
              style={
                vista === "tareas"
                  ? menuActivo
                  : menuBtn
              }
            >
              Tareas
            </button>

            {/* SOLO ADMIN */}
            {usuario?.rol === "admin" && (

              <button
                onClick={() => setVista("usuarios")}
                style={
                  vista === "usuarios"
                    ? menuActivo
                    : menuBtn
                }
              >
                Usuarios
              </button>

            )}

            <button
              style={menuBtn}
            >
              Configuración
            </button>

          </div>

        </div>

        {/* USER */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            padding: "18px",
            borderRadius: "18px",
            backdropFilter: "blur(10px)"
          }}
        >

          <h3 style={{ margin: 0 }}>
            {usuario?.nombre}
          </h3>

          <p
            style={{
              marginTop: "5px",
              opacity: 0.8
            }}
          >
            {usuario?.rol}
          </p>

          <button
            onClick={logout}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "white",
              color: "#2563eb",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Cerrar sesión
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          padding: "35px"
        }}
      >

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "35px"
          }}
        >

          <div>

            <h1
              style={{
                fontSize: "42px",
                margin: 0,
                color: "#0f172a"
              }}
            >
              TeamTrack Enterprise
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "10px"
              }}
            >
              Plataforma empresarial multi-equipo.
            </p>

          </div>

          {/* SOLO ADMIN */}
          {usuario?.rol === "admin" && (

            <button
              onClick={() =>
                setMostrarModalProyecto(true)
              }
              style={gradientButton}
            >
              + Nuevo Proyecto
            </button>

          )}

        </div>

        {/* DASHBOARD */}
        {vista === "dashboard" && (

          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px",
                marginBottom: "35px"
              }}
            >

              <div style={cardStyle}>
                <p style={cardTitle}>Proyectos</p>
                <h2 style={{ ...cardNumber, color: "#2563eb" }}>
                  {proyectos.length}
                </h2>
              </div>

              <div style={cardStyle}>
                <p style={cardTitle}>Tareas</p>
                <h2 style={{ ...cardNumber, color: "#7c3aed" }}>
                  {tareas.length}
                </h2>
              </div>

              <div style={cardStyle}>
                <p style={cardTitle}>Usuarios</p>
                <h2 style={{ ...cardNumber, color: "#22c55e" }}>
                  {usuarios.length}
                </h2>
              </div>

              <div style={cardStyle}>
                <p style={cardTitle}>Progreso</p>
                <h2 style={{ ...cardNumber, color: "#06b6d4" }}>
                  {progreso}%
                </h2>
              </div>

            </div>

            {/* PROGRESO */}
            <div style={cardStyle}>

              <h2 style={{ color: "#0f172a" }}>
                Progreso General
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px"
                }}
              >

                <div
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    background:
                      `conic-gradient(
                        #2563eb ${progreso * 3.6}deg,
                        #e2e8f0 0deg
                      )`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >

                  <div
                    style={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >

                    <h1
                      style={{
                        margin: 0,
                        fontSize: "52px",
                        color: "#2563eb"
                      }}
                    >
                      {progreso}%
                    </h1>

                    <p style={{ color: "#64748b" }}>
                      completado
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </>
        )}

        {/* PROYECTOS */}
        {vista === "proyectos" && (

          <div>

            <h2
              style={{
                color: "#0f172a",
                marginBottom: "20px"
              }}
            >
              Proyectos
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px"
              }}
            >

              {proyectos.map((p) => (

                <div
                  key={p.id}
                  style={cardStyle}
                >

                  <h3 style={{ color: "#2563eb" }}>
                    {p.nombre}
                  </h3>

                  <p style={{ color: "#64748b" }}>
                    {p.descripcion}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* TAREAS */}
        {vista === "tareas" && (

          <div>

            <h2
              style={{
                color: "#0f172a",
                marginBottom: "20px"
              }}
            >
              Tareas
            </h2>

            {/* SOLO ADMIN */}
            {usuario?.rol === "admin" && (

              <div
                style={{
                  ...cardStyle,
                  marginBottom: "30px"
                }}
              >

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px"
                  }}
                >

                  <input
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    style={inputStyle}
                  />

                  <select
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                    style={inputStyle}
                  >

                    <option value="">
                      Seleccionar usuario
                    </option>

                    {usuarios.map((u) => (
                      <option
                        key={u.id}
                        value={u.id}
                      >
                        {u.nombre}
                      </option>
                    ))}

                  </select>

                  <select
                    value={proyectoId}
                    onChange={(e) => setProyectoId(e.target.value)}
                    style={inputStyle}
                  >

                    <option value="">
                      Seleccionar proyecto
                    </option>

                    {proyectos.map((p) => (
                      <option
                        key={p.id}
                        value={p.id}
                      >
                        {p.nombre}
                      </option>
                    ))}

                  </select>

                </div>

                <button
                  onClick={handleCrearTarea}
                  style={{
                    ...gradientButton,
                    marginTop: "20px"
                  }}
                >
                  Crear tarea
                </button>

              </div>

            )}

{/* KANBAN */}
<DragDropContext onDragEnd={onDragEnd}>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "20px"
    }}
  >

{/* PENDIENTES */}
<div style={kanbanColumn}>

  <h3 style={{ color: "#f59e0b" }}>
    Pendiente
  </h3>

  {pendientes.map((t) => (

    <div key={t.id} style={taskCard}>

      <h4>{t.titulo}</h4>

      <p style={{ color: "#64748b" }}>
        {t.descripcion}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={() =>
            cambiarEstado(
              t.id,
              "en progreso"
            )
          }
          style={smallButton}
        >
          Pasar a progreso
        </button>

        <button
          onClick={() =>
            handleEliminarTarea(t.id)
          }
          style={{
            ...smallButton,
            background: "#ef4444"
          }}
        >
          Eliminar
        </button>

        <button
          onClick={() =>
            abrirEditarTarea(t)
          }
          style={{
            ...smallButton,
            background: "#f59e0b"
          }}
        >
          Editar
        </button>

      </div>

    </div>

  ))}

              </div>

              {/* EN PROGRESO */}
<div style={kanbanColumn}>

  <h3 style={{ color: "#2563eb" }}>
    En progreso
  </h3>

  {progresoTareas.map((t) => (

    <div key={t.id} style={taskCard}>

      <h4>{t.titulo}</h4>

      <p style={{ color: "#64748b" }}>
        {t.descripcion}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={() =>
            cambiarEstado(
              t.id,
              "completada"
            )
          }
          style={smallButton}
        >
          Completar
        </button>

        <button
          onClick={() =>
            handleEliminarTarea(t.id)
          }
          style={{
            ...smallButton,
            background: "#ef4444"
          }}
        >
          Eliminar
        </button>

        <button
          onClick={() =>
            abrirEditarTarea(t)
          }
          style={{
            ...smallButton,
            background: "#f59e0b"
          }}
        >
          Editar
        </button>

      </div>

    </div>

  ))}

</div>

{/* COMPLETADAS */}
<div style={kanbanColumn}>

  <h3 style={{ color: "#22c55e" }}>
    Completadas
  </h3>

  {completadas.map((t) => (

    <div key={t.id} style={taskCard}>

      <h4>{t.titulo}</h4>

      <p style={{ color: "#64748b" }}>
        {t.descripcion}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={() =>
            handleEliminarTarea(t.id)
          }
          style={{
            ...smallButton,
            background: "#ef4444"
          }}
        >
          Eliminar
        </button>

        <button
          onClick={() =>
            abrirEditarTarea(t)
          }
          style={{
            ...smallButton,
            background: "#f59e0b"
          }}
        >
          Editar
        </button>

      </div>

    </div>

  ))}

</div>

  </div>

</DragDropContext>

</div>

)}

        

        {/* USUARIOS */}
        {vista === "usuarios" && usuario?.rol === "admin" && (

          <div>

            <h2
              style={{
                color: "#0f172a",
                marginBottom: "20px"
              }}
            >
              Equipo de trabajo
            </h2>

            {/* CREAR EMPLEADO */}
            <div
              style={{
                ...cardStyle,
                marginBottom: "25px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: "15px",
                alignItems: "center"
              }}
            >

              <input
                placeholder="Nombre"
                value={nombreUsuario}
                onChange={(e) =>
                  setNombreUsuario(e.target.value)
                }
                style={inputStyle}
              />

              <input
                placeholder="Email"
                value={emailUsuario}
                onChange={(e) =>
                  setEmailUsuario(e.target.value)
                }
                style={inputStyle}
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={passwordUsuario}
                onChange={(e) =>
                  setPasswordUsuario(e.target.value)
                }
                style={inputStyle}
              />

              <button
                onClick={handleCrearUsuario}
                style={gradientButton}
              >
                Crear empleado
              </button>

            </div>

            {/* LISTA */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px"
              }}
            >

              {usuarios.map((u) => (

                <div
                  key={u.id}
                  style={cardStyle}
                >

                  <h3 style={{ color: "#2563eb" }}>
                    {u.nombre}
                  </h3>

                  <p style={{ color: "#64748b" }}>
                    {u.email}
                  </p>

                  <span
                    style={{
                      background:
                        u.rol === "admin"
                          ? "#dbeafe"
                          : "#ede9fe",

                      color:
                        u.rol === "admin"
                          ? "#2563eb"
                          : "#7c3aed",

                      padding: "8px 14px",

                      borderRadius: "12px",

                      fontWeight: "bold",

                      fontSize: "14px"
                    }}
                  >
                    {u.rol}
                  </span>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

||||||{/* MODAL EDITAR TAREA */}
{mostrarModalEditar && (

  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}
  >

    <div
      style={{
        background: "white",
        width: "450px",
        padding: "30px",
        borderRadius: "20px"
      }}
    >

      <h2 style={{ color: "#0f172a" }}>
        Editar tarea
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px"
        }}
      >

        <input
          placeholder="Título"
          value={editarTitulo}
          onChange={(e) =>
            setEditarTitulo(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="Descripción"
          value={editarDescripcion}
          onChange={(e) =>
            setEditarDescripcion(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={guardarEdicionTarea}
          style={gradientButton}
        >
          Guardar cambios
        </button>

        <button
          onClick={() =>
            setMostrarModalEditar(false)
          }
          style={{
            ...menuBtn,
            color: "#0f172a",
            background: "#e2e8f0"
          }}
        >
          Cancelar
        </button>

      </div>

    </div>

  </div>

)}
      {/* MODAL PROYECTO */}
      {mostrarModalProyecto && usuario?.rol === "admin" && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >

          <div
            style={{
              background: "white",
              width: "450px",
              padding: "30px",
              borderRadius: "20px"
            }}
          >

            <h2 style={{ color: "#0f172a" }}>
              Crear Proyecto
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "20px"
              }}
            >

              <input
                placeholder="Nombre"
                value={nombreProyecto}
                onChange={(e) =>
                  setNombreProyecto(e.target.value)
                }
                style={inputStyle}
              />

              <input
                placeholder="Descripción"
                value={descripcionProyecto}
                onChange={(e) =>
                  setDescripcionProyecto(e.target.value)
                }
                style={inputStyle}
              />

              <button
                onClick={handleCrearProyecto}
                style={gradientButton}
              >
                Crear Proyecto
              </button>

              <button
                onClick={() =>
                  setMostrarModalProyecto(false)
                }
                style={{
                  ...menuBtn,
                  color: "#0f172a",
                  background: "#e2e8f0"
                }}
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


const menuBtn = {
  background: "rgba(255,255,255,0.1)",
  border: "none",
  padding: "15px",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
  fontWeight: "bold"
};

const menuActivo = {
  ...menuBtn,
  background: "white",
  color: "#2563eb"
};

const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)"
};

const cardTitle = {
  color: "#64748b",
  margin: 0
};

const cardNumber = {
  fontSize: "42px",
  marginTop: "15px"
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: "15px"
};

const gradientButton = {
  background: "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  border: "none",
  padding: "15px",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 20px rgba(37,99,235,0.2)"
};

const kanbanColumn = {
  background: "white",
  padding: "20px",
  borderRadius: "20px",
  minHeight: "400px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)"
};

const taskCard = {
  background: "#f8fafc",
  padding: "15px",
  borderRadius: "15px",
  marginTop: "15px",
  border: "1px solid #e2e8f0"
};

const smallButton = {
  marginTop: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer"
};

export default Dashboard;