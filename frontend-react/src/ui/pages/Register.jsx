import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { register } from "../../application/services/auth.service";

function Register() {

  const [nombre, setNombre] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (
      !nombre.trim() ||
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

    if (password.length < 6) {

      toast.error(
        "La contraseña debe tener mínimo 6 caracteres"
      );

      return;
    }

    try {

      await register({
        nombre,
        email,
        password,
        rol: "usuario"
      });

      toast.success(
        "Cuenta creada correctamente"
      );

      navigate("/");

    } catch (error) {

      toast.error(
        "No se pudo completar el registro"
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
          Registro
        </h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
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
          onClick={handleRegister}
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
          Registrarse
        </button>

        <p
          onClick={() =>
            navigate("/")
          }
          style={{
            marginTop: "15px",
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          ¿Ya tienes cuenta?
          {" "}
          Inicia sesión
        </p>

      </div>

    </div>
  );
}

export default Register;