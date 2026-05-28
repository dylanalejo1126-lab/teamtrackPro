const API = "http://localhost:3000";


export const getTareas = async (token) => {

  const res = await fetch(`${API}/tareas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};


export const createTarea = async (data, token) => {

  const res = await fetch(`${API}/tareas`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify(data)
  });

  return res.json();
};


export const updateTareaApi = async (

  id,

  data,

  token

) => {

  const res = await fetch(

    `${API}/tareas/${id}`,

    {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(data)
    }
  );

  return res.json();
};


export const deleteTareaApi = async (

  id,

  token

) => {

  const res = await fetch(

    `${API}/tareas/${id}`,

    {

      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};