import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../application/services/auth.service";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await register({ nombre, email, password, rol: "usuario" });
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
        <img src="/logo.png" alt="logo" style={{ height: "60px", marginBottom: "10px" }} />

        <h1 style={{ fontSize: "22px", marginBottom: "15px" }}>TeamTrack</h1>
        <h2>Registro</h2>

        <input
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
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
            borderRadius: "6px"
          }}
        >
          Registrarse
        </button>

        <p
          onClick={() => navigate("/")}
          style={{ marginTop: "15px", color: "#2563eb", cursor: "pointer" }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </p>
      </div>
    </div>
  );
}

export default Register;