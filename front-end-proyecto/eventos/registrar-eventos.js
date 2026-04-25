let categorias = [];
const params = new URLSearchParams(window.location.search);
const idEvento = params.get('id'); // Detectamos si venimos de "Editar"

const cargarCategorias = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/categorias");
        const data = await response.json();
        const select = document.getElementById("sltCategoria");

        select.innerHTML = '<option value="">Seleccione una categoría</option>';

        data.categorias.forEach((categoria) => {
            select.innerHTML += `
                <option value="${categoria._id}">
                    ${categoria.nombre}
                </option>
            `;
        });

        // Si estamos editando, cargamos los datos del evento después de tener las categorías
        if (idEvento) {
            await cargarDatosEvento(idEvento);
        }
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
    }
};

const cargarDatosEvento = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/eventos/${id}`);
        const data = await response.json();

        if (data.estado === 'ok') {
            const evento = data.evento;
            
            // Cambiar textos de la interfaz
            document.querySelector('h1').innerText = "Editar Evento";
            document.querySelector('button[type="submit"]').innerText = "Guardar Cambios";

            // Llenar campos
            document.getElementById("txtNombre").value = evento.nombre;
            document.getElementById("txtDescripcion").value = evento.descripcion;
            document.getElementById("txtLugar").value = evento.lugar;
            document.getElementById("txtHora").value = evento.hora;
            document.getElementById("sltEstado").value = evento.estado;
            document.getElementById("sltCategoria").value = evento.categoria._id || evento.categoria;

            // Formatear fecha (YYYY-MM-DD) para el input date
            if (evento.fecha) {
                const fecha = new Date(evento.fecha).toISOString().split('T')[0];
                document.getElementById("txtFecha").value = fecha;
            }
        }
    } catch (error) {
        console.error("Error al obtener datos del evento:", error);
    }
};

const guardarEvento = async (event) => {
    event.preventDefault();

    const evento = {
        nombre: document.getElementById("txtNombre").value,
        descripcion: document.getElementById("txtDescripcion").value,
        fecha: document.getElementById("txtFecha").value,
        lugar: document.getElementById("txtLugar").value,
        hora: document.getElementById("txtHora").value,
        categoria: document.getElementById("sltCategoria").value,
        estado: document.getElementById("sltEstado").value,
    };

    try {
        // Si hay idEvento usamos PUT y la ruta con ID, si no POST a la ruta general
        const url = idEvento 
            ? `http://localhost:3000/api/eventos/${idEvento}` 
            : "http://localhost:3000/api/eventos";
        
        const method = idEvento ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(evento),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Error en la operación.");
            return;
        }

        alert(idEvento ? "Evento actualizado con éxito." : "Evento registrado exitosamente.");
        window.location.href = 'listar-eventos.html';
        
    } catch (error) {
        console.error("Error al procesar el evento:", error);
        alert("Ocurrió un error inesperado.");
    }
};

const cancelarRegistro = () => {
    window.location.href = 'listar-eventos.html';
};

// Inicialización
cargarCategorias();
document.getElementById("formRegistrarEvento").addEventListener("submit", guardarEvento);