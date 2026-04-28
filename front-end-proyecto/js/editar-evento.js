const formEditarEvento = document.getElementById('formEditarEvento');
const mensajeEvento = document.getElementById('mensajeEvento');

const txtNombreEvento = document.getElementById('txtNombreEvento');
const txtDescripcionEvento = document.getElementById('txtDescripcionEvento');
const txtFechaEvento = document.getElementById('txtFechaEvento');
const txtHoraEvento = document.getElementById('txtHoraEvento');
const txtLugarEvento = document.getElementById('txtLugarEvento');
const sltCategoriaEvento = document.getElementById('sltCategoriaEvento');
const sltEstadoEvento = document.getElementById('sltEstadoEvento');

const parametros = new URLSearchParams(window.location.search);
const idEvento = parametros.get('id');

const txtImagenEvento = document.getElementById('txtImagenEvento');

function mostrarMensajeEvento(texto, tipo) {
    mensajeEvento.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}

async function cargarCategoriasEnSelect(categoriaSeleccionadaId) {
    try {
        const response = await fetch('http://localhost:3000/api/categorias');
        const data = await response.json();

        sltCategoriaEvento.innerHTML = '<option value="">Seleccione una categoría</option>';

        if (!response.ok || !data.categorias) {
            sltCategoriaEvento.innerHTML = '<option value="">Error al cargar categorías</option>';
            return;
        }

        data.categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria._id;
            option.textContent = categoria.nombre;

            if (categoria._id === categoriaSeleccionadaId) {
                option.selected = true;
            }

            sltCategoriaEvento.appendChild(option);
        });

    } catch (error) {
        sltCategoriaEvento.innerHTML = '<option value="">No se pudo conectar con el servidor</option>';
        console.error(error);
    }
}

async function cargarEvento() {
    if (!idEvento) {
        mostrarMensajeEvento('No se recibió el identificador del evento.', 'danger');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/${idEvento}`);
        const data = await response.json();

        if (!response.ok) {
            mostrarMensajeEvento(data.message || 'No se pudo cargar el evento.', 'danger');
            return;
        }

        const evento = data.evento;

        txtNombreEvento.value = evento.nombre;
        txtDescripcionEvento.value = evento.descripcion;
        txtFechaEvento.value = evento.fecha;
        txtHoraEvento.value = evento.hora;
        txtLugarEvento.value = evento.lugar;
        sltEstadoEvento.value = evento.estado;

        txtImagenEvento.value = evento.imagen || '';

        const categoriaId = evento.categoria ? evento.categoria._id : '';
        await cargarCategoriasEnSelect(categoriaId);

    } catch (error) {
        mostrarMensajeEvento('No se pudo conectar con el servidor.', 'danger');
        console.error(error);
    }
}

formEditarEvento.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = txtNombreEvento.value.trim();
    const descripcion = txtDescripcionEvento.value.trim();
    const fecha = txtFechaEvento.value;
    const hora = txtHoraEvento.value;
    const lugar = txtLugarEvento.value.trim();
    const categoria = sltCategoriaEvento.value;
    const estado = sltEstadoEvento.value;

    const imagen = txtImagenEvento.value.trim();

    if (!nombre || !descripcion || !fecha || !hora || !lugar || !categoria || !estado) {
        mostrarMensajeEvento('Todos los campos son obligatorios.', 'danger');
        return;
    }

    const eventoActualizado = {
        nombre,
        descripcion,
        fecha,
        hora,
        lugar,
        categoria,
        estado,
        imagen
    };

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/${idEvento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventoActualizado)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensajeEvento(data.message || 'No se pudo actualizar el evento.', 'danger');
            return;
        }

        mostrarMensajeEvento('Evento actualizado correctamente.', 'success');

        setTimeout(() => {
            window.location.href = 'listar-eventos.html';
        }, 1200);

    } catch (error) {
        mostrarMensajeEvento('No se pudo conectar con el servidor.', 'danger');
        console.error(error);
    }
});

cargarEvento();