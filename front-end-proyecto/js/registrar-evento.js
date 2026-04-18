const formRegistrarEvento = document.getElementById('formRegistrarEvento');
const mensajeEvento = document.getElementById('mensajeEvento');
const sltCategoriaEvento = document.getElementById('sltCategoriaEvento');

async function cargarCategoriasEnSelect() {
    try {
        const response = await fetch('http://localhost:3000/api/categorias');
        const data = await response.json();

        sltCategoriaEvento.innerHTML = '';

        if (!response.ok) {
            sltCategoriaEvento.innerHTML = '<option value="">Error al cargar categorías</option>';
            return;
        }

        if (!data.categorias || data.categorias.length === 0) {
            sltCategoriaEvento.innerHTML = '<option value="">No hay categorías registradas</option>';
            return;
        }

        sltCategoriaEvento.innerHTML = '<option value="">Seleccione una categoría</option>';

        data.categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria._id;
            option.textContent = categoria.nombre;
            sltCategoriaEvento.appendChild(option);
        });

    } catch (error) {
        sltCategoriaEvento.innerHTML = '<option value="">No se pudo conectar con el servidor</option>';
        console.error(error);
    }
}

formRegistrarEvento.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('txtNombreEvento').value.trim();
    const descripcion = document.getElementById('txtDescripcionEvento').value.trim();
    const fecha = document.getElementById('txtFechaEvento').value;
    const hora = document.getElementById('txtHoraEvento').value;
    const lugar = document.getElementById('txtLugarEvento').value.trim();
    const categoria = document.getElementById('sltCategoriaEvento').value;
    const estado = document.getElementById('sltEstadoEvento').value;

    if (!nombre || !descripcion || !fecha || !hora || !lugar || !categoria || !estado) {
        mostrarMensajeEvento('Todos los campos son obligatorios.', 'danger');
        return;
    }

    const eventoNuevo = {
        nombre,
        descripcion,
        fecha,
        hora,
        lugar,
        categoria,
        estado
    };

    try {
        const response = await fetch('http://localhost:3000/api/eventos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventoNuevo)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensajeEvento(data.message || 'No se pudo registrar el evento.', 'danger');
            return;
        }

        mostrarMensajeEvento('Evento registrado correctamente.', 'success');
        formRegistrarEvento.reset();
        cargarCategoriasEnSelect();

    } catch (error) {
        mostrarMensajeEvento('Ocurrió un error al conectar con el servidor.', 'danger');
        console.error(error);
    }
});

function mostrarMensajeEvento(texto, tipo) {
    mensajeEvento.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}

cargarCategoriasEnSelect();