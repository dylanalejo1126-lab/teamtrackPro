import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        email,
        password,
        rol: "usuario"
      })
    });

    alert("Usuario creado");
    navigate("/");
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9"
    }}>

      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        width: "320px",
        textAlign: "center"
      }}>

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="logo"
          style={{ height: "60px", marginBottom: "10px" }}
        />

        {/* NOMBRE */}
        <h1 style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#0f172a",
          marginBottom: "20px",
          letterSpacing: "1px"
        }}>
          TeamTrack
        </h1>

        <h2 style={{ marginBottom: "10px" }}>Registro</h2>

        <input
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Registrarse
        </button>

        {/* 🔥 NUEVO TEXTO */}
        <p
          onClick={() => navigate("/")}
          style={{
            marginTop: "15px",
            color: "#2563eb",
            cursor: "pointer"
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </p>

      </div>
    </div>
  );
}

export default Register;