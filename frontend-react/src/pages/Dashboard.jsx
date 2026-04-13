import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usuarioId, setUsuarioId] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //  OBTENER TAREAS
  const obtenerTareas = async () => {
    const res = await fetch("http://localhost:3000/tareas", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setTareas(data);
  };

  //  OBTENER USUARIOS
  const obtenerUsuarios = async () => {
    const res = await fetch("http://localhost:3000/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setUsuarios(data);
  };

  //  CREAR TAREA
  const crearTarea = async () => {
    try {
      const res = await fetch("http://localhost:3000/tareas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          estado: "pendiente",
          prioridad: "alta",
          fechaLimite: new Date(),
          usuarioId: Number(usuarioId),
          proyectoId: 1
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al crear tarea");
        return;
      }

      setTitulo("");
      setDescripcion("");
      setUsuarioId("");

      obtenerTareas();
    } catch (error) {
      alert("Error de conexión");
    }
  };

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    obtenerTareas();
    obtenerUsuarios();
  }, []);

  return (
    <div>

      {/*  NAVBAR */}
      <div style={{
        height: "60px",
        background: "#2563eb",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px"
      }}>

        <img
          src="/logo.png"
          alt="logo"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ height: "40px", cursor: "pointer" }}
        />

        <div
          onClick={logout}
          style={{
            background: "white",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer"
          }}
        />

      </div>

      <div style={{ display: "flex" }}>

        {/*  SIDEBAR */}
        {sidebarOpen && (
          <div style={{
            width: "200px",
            height: "calc(100vh - 60px)",
            background: "#38bdf8",
            padding: "20px",
            color: "white"
          }}>
            <h3>Menú</h3>
            <p>📋 Tareas</p>
            <p>➕ Crear</p>
          </div>
        )}

        {/*  CONTENIDO */}
        <div style={{
          flex: 1,
          padding: "20px",
          background: "#f1f5f9",
          color: "#0f172a",
          minHeight: "calc(100vh - 60px)"
        }}>
          <h2>Mis Tareas</h2>

          {/*  FORM */}
          <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "20px"
          }}>
            <input
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <br /><br />

            <input
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br /><br />

            {/*  SELECT USUARIOS */}
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
            >
              <option value="">Seleccionar usuario</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} ({u.rol})
                </option>
              ))}
            </select>

            <br /><br />

            <button onClick={crearTarea}>
              Crear tarea
            </button>
          </div>

          {/* 📋 LISTA */}
          {tareas.map((t) => (
            <div key={t.id} style={{
              background: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}>
              <h4>{t.titulo}</h4>
              <p>{t.descripcion}</p>
              <p><b>{t.estado}</b></p>
              <p>👤 {t.usuario?.nombre}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;