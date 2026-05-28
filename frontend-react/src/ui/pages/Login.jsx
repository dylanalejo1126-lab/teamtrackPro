import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  login
} from "../../application/services/auth.service";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (
      !email.trim() ||
      !password.trim()
    ) {

      toast.error(
        "Todos los campos son obligatorios"
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      toast.error(
        "Ingresa un correo válido"
      );

      return;
    }

    try {

      const data = await login({
        email,
        password
      });

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "usuario",
          JSON.stringify(data.usuario)
        );

        toast.success(
          "Bienvenido a TeamTrack"
        );

        navigate("/dashboard");

      } else {

        toast.error(
          "Verifica tus credenciales"
        );
      }

    } catch (error) {

      toast.error(
        "No se pudo iniciar sesión"
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
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            outline: "none"
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            outline: "none"
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
            fontWeight: "bold",
            transition: "0.2s"
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
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          ¿No tienes cuenta?
          {" "}
          Regístrate
        </p>

      </div>

    </div>
  );
}

export default Login;