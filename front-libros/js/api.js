const API_URL = "http://localhost:3000/libros";

//crear un libro
export async function crearLibro(titulo, autor, paginas) {
    const response = await fetch(API_URL + "/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ titulo, autor, paginas })
    });
    return response.json();
}

export async function obtenerLibros() {
  const res = await fetch(`${API_URL}/list`);
  return res.json();
}

export async function eliminarLibro(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  return res.json();
}
export async function buscarLibro(id) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Libro no encontrado");
  }

  return res.json();
}

//actualizar libro
export async function actualizarLibro(id, datos) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    return res.json();
}



