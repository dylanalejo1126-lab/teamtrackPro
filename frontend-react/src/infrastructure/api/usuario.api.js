const API = "http://localhost:3000";


export const getUsuarios = async (
  token
) => {

  const res = await fetch(
    `${API}/usuarios`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};


export const createUsuario = async (
  data,
  token
) => {

  const res = await fetch(
    `${API}/usuarios`,
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