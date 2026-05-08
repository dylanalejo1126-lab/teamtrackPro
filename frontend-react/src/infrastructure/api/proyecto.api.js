export const getProyectosApi = async (token) => {

  const res = await fetch(
    "http://localhost:3000/proyectos",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};

export const createProyectoApi = async (
  data,
  token
) => {

  const res = await fetch(
    "http://localhost:3000/proyectos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
  );

  return res.json();
};