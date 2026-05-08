import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  login
} from "../../application/services/auth.service";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const data = await login({
      email,
      password
    });

    if (data.token) {

      // TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // USUARIO
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      navigate("/dashboard");

    } else {

      alert(
        "Credenciales incorrectas"
      );
    }
  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          width: "320px",
          textAlign: "center"
        }}
      >

        <img
          src="/logo.png"
          alt="logo"
          style={{
            height: "60px",
            marginBottom: "10px"
          }}
        />

        <h1
          style={{
            fontSize: "22px",
            marginBottom: "15px"
          }}
        >
          TeamTrack
        </h1>

        <h2>
          Iniciar Sesión
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Iniciar sesión
        </button>

        <p
          onClick={() =>
            navigate("/register")
          }
          style={{
            marginTop: "15px",
            color: "#2563eb",
            cursor: "pointer"
          }}
        >
          ¿No tienes cuenta?
          Regístrate
        </p>

      </div>

    </div>
  );
}

export default Login;