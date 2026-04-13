# 🚀 TeamTrack - Sistema de Gestión de Tareas

Aplicación fullstack para la gestión de tareas con roles (admin / usuario), autenticación con JWT, backend en Node.js y frontend en React.

---

# 🧠 Tecnologías utilizadas

* Node.js + Express
* Prisma ORM
* MySQL
* React (Vite)
* JWT (Autenticación)
* Swagger (Documentación API)
* Postman (Pruebas)

---

# ⚙️ INSTALACIÓN DEL PROYECTO

## 📥 1. Clonar repositorio

```bash
git clone https://github.com/dylanalejo1126-lab/teamtrack-backend.git
cd teamtrack-backend
```

---

## 📦 2. Instalar dependencias (backend)

```bash
npm install
```

---

## 🗄️ 3. Configurar base de datos

Crear archivo `.env`:

```env
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/teamtrack"
```

---

## 🔄 4. Migraciones

```bash
npx prisma migrate dev
```

---

## ▶️ 5. Ejecutar backend

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

## 📚 Swagger (Documentación API)

Abrir en navegador:

```
http://localhost:3000/docs
```

---

# 💻 FRONTEND (React)

## 📥 Entrar a la carpeta

```bash
cd frontend-react
```

---

## 📦 Instalar dependencias

```bash
npm install
```

---

## ▶️ Ejecutar frontend

```bash
npm run dev
```

Abrir:

```
http://localhost:5173
```

---

# 🔐 AUTENTICACIÓN

El sistema usa JWT.

Después del login se obtiene un token que debe enviarse en:

```
Authorization: Bearer TOKEN
```

---

# 📬 PRUEBAS CON POSTMAN

## 🔐 REGISTER

```
POST http://localhost:3000/auth/register
```

Body:

```json
{
  "nombre": "Dylan",
  "email": "test@test.com",
  "password": "1234",
  "rol": "admin"
}
```

---

## 🔐 LOGIN

```
POST http://localhost:3000/auth/login
```

```json
{
  "email": "test@test.com",
  "password": "1234"
}
```

✔ Copiar el token

---

## 📋 OBTENER TAREAS

```
GET http://localhost:3000/tareas
```

Headers:

```
Authorization: Bearer TOKEN
```

---

## ➕ CREAR TAREA

```
POST http://localhost:3000/tareas
```

```json
{
  "titulo": "Tarea ejemplo",
  "descripcion": "Prueba",
  "estado": "pendiente",
  "prioridad": "alta",
  "fechaLimite": "2026-12-01",
  "usuarioId": 1,
  "proyectoId": 1
}
```

---

## 👥 OBTENER USUARIOS

```
GET http://localhost:3000/usuarios
```

---

# 🔐 ROLES

* 👨‍💼 Admin:

  * Puede crear tareas
  * Puede asignarlas a otros usuarios

* 👤 Usuario:

  * Solo puede ver sus tareas

---

# 📌 FUNCIONALIDADES

* Registro e inicio de sesión
* Autenticación con JWT
* CRUD de tareas
* Asignación de tareas a usuarios
* Filtro de tareas por usuario
* Interfaz en React
* Documentación con Swagger

---

# ⚠️ IMPORTANTE

* El backend debe estar corriendo para usar Swagger y Postman
* MySQL debe estar activo
* Configurar correctamente el `.env`

---

# 👨‍💻 AUTOR

Proyecto desarrollado por Dylan Guzmán 🚀
