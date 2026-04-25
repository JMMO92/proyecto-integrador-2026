let categorias = [];

const cargarCategorias = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/categorias");
    const { categorias } = await response.json();
    console.log(categorias);

    const select = document.getElementById("sltCategoria");

    select.innerHTML = '<option value="">Seleccione una categoría</option>';

    categorias.forEach((categoria) => {
      select.innerHTML += `
                <option value="${categoria._id}">
                    ${categoria.nombre}
                </option>
            `;
    });
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
};

const validarFormulario = (nombre, descripcion, fecha, hora, lugar, categoriaId, estado) => {

  if (!nombre || !descripcion || !fecha || !hora || !lugar || !categoriaId, !estado) {
    //alert('Por favor, complete todos los campos del formulario.');
    return false;
  }
  return true;
};

const registrarEvento = async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("txtNombre").value;
  const descripcion = document.getElementById("txtDescripcion").value;
  const fecha = document.getElementById("txtFecha").value;
  const lugar = document.getElementById("txtLugar").value;
  const hora = document.getElementById("txtHora").value;
  const categoria = document.getElementById("sltCategoria").value;
  const estado = document.getElementById("sltEstado").value;

  if (!validarFormulario(nombre, descripcion, fecha, hora, lugar, categoria, estado)) {
    return;
  }

  const evento = {
    nombre,
    descripcion,
    fecha,
    hora,
    lugar,
    estado,
    categoria,
  };

  try {
    const response = await fetch("http://localhost:3000/api/eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    });

    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "No se pudo registrar el evento.");
      return;
    }

    alert("Evento registrado exitosamente.");
    document.getElementById("formRegistrarEvento").reset();
  } catch (error) {
    console.error("Error al registrar el evento:", error);
    alert("Ocurrió un error al registrar el evento.");
  }
};

cancelarRegistro = () => {
  window.location.href = 'listar-eventos.html';
}

cargarCategorias();

//event listeners
document.getElementById("formRegistrarEvento").addEventListener("submit", registrarEvento);
