import {
  crearLibro,
  obtenerLibros,
  buscarLibro,
  actualizarLibro,
  eliminarLibro
} from "./api.js";


const form = document.getElementById("form-libro");
const listaLibros = document.getElementById("lista-libros");
const buscarId = document.getElementById("buscar-id");
//console.log(buscarId);
const btnBuscar = document.getElementById("btn-buscar");
const resultadoBusqueda = document.getElementById("resultado-busqueda");
const btnActualizar = document.getElementById("btn-actualizar");
//console.log(btnActualizar);


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const paginas = document.getElementById("paginas").value;
  await crearLibro(titulo, autor, paginas);
  form.reset();
  cargarLibros();
});
async function cargarLibros() {
  const libros = await obtenerLibros();
  listaLibros.innerHTML = "";
  if (libros.length === 0) {
    listaLibros.innerHTML = "<li>No hay libros registrados</li>";
    return;
  }
  libros.forEach((libro) => {
    console.log(libro._id);
    const li = document.createElement("li");
    li.innerHTML = `
            <span><strong>${libro.titulo}</strong> - ${libro.autor} - ${libro._id}</span>
            <button>Eliminar</button>
        `;
    //Evento eliminar libro
    li.querySelector("button").addEventListener("click", async () => {
      if (confirm("Seguro quieres eliminar el libro?")) {
        await eliminarLibro(libro._id);
        cargarLibros();
      }
    });
    listaLibros.appendChild(li);
  });

}


btnBuscar.addEventListener("click", async () => {
  const id = buscarId.value.trim();
  

  if (!id) return alert("Ingresa un ID válido");

  try {
    const libro = await buscarLibro(id);

    resultadoBusqueda.innerHTML = `
      <p><strong>Titulo:</strong> ${libro.titulo}</p>
      <p><strong>Autor:</strong> ${libro.autor}</p>
      <p><strong>Paginas:</strong> ${libro.paginas}</p>
    `;
  } catch (error) {
    resultadoBusqueda.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
});

const btnListar = document.getElementById("btn-listar");

btnListar.addEventListener("click", () => {
  cargarLibros();
});



// Evento actualizar
btnActualizar.addEventListener("click", async () => {

  const id = document.getElementById("actualizar-id").value.trim();

  const titulo = document.getElementById("actualizar-titulo").value;

  const autor = document.getElementById("actualizar-autor").value;

  const paginas = document.getElementById("actualizar-paginas").value;

  if (!id) {
    return alert("Ingresa un ID");
  }

  try {

    await actualizarLibro(id, {
      titulo,
      autor,
      paginas
    });

    alert("Libro actualizado");

    cargarLibros();

  } catch (error) {

    console.error(error);
    alert("Error al actualizar");

  }

});