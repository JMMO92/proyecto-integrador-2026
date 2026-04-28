const formEditarCategoria = document.getElementById('formEditarCategoria');
const mensajeCategoria = document.getElementById('mensajeCategoria');

const txtNombreCategoria = document.getElementById('txtNombreCategoria');
const txtDescripcionCategoria = document.getElementById('txtDescripcionCategoria');
const sltEstadoCategoria = document.getElementById('sltEstadoCategoria');

const parametros = new URLSearchParams(window.location.search);
const idCategoria = parametros.get('id');

function mostrarMensajeCategoria(texto, tipo) {
    mensajeCategoria.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}

async function cargarCategoria() {
    if (!idCategoria) {
        mostrarMensajeCategoria('No se recibió el identificador de la categoría.', 'danger');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/categorias/${idCategoria}`);
        const data = await response.json();

        if (!response.ok) {
            mostrarMensajeCategoria(data.message || 'No se pudo cargar la categoría.', 'danger');
            return;
        }

        txtNombreCategoria.value = data.categoria.nombre;
        txtDescripcionCategoria.value = data.categoria.descripcion;
        sltEstadoCategoria.value = data.categoria.estado;

    } catch (error) {
        mostrarMensajeCategoria('No se pudo conectar con el servidor.', 'danger');
        console.error(error);
    }
}

formEditarCategoria.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = txtNombreCategoria.value.trim();
    const descripcion = txtDescripcionCategoria.value.trim();
    const estado = sltEstadoCategoria.value;

    if (!nombre || !descripcion || !estado) {
        mostrarMensajeCategoria('Todos los campos son obligatorios.', 'danger');
        return;
    }

    const categoriaActualizada = {
        nombre,
        descripcion,
        estado
    };

    try {
        const response = await fetch(`http://localhost:3000/api/categorias/${idCategoria}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoriaActualizada)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensajeCategoria(data.message || 'No se pudo actualizar la categoría.', 'danger');
            return;
        }

        mostrarMensajeCategoria('Categoría actualizada correctamente.', 'success');

        setTimeout(() => {
            window.location.href = 'listar-categorias.html';
        }, 1200);

    } catch (error) {
        mostrarMensajeCategoria('No se pudo conectar con el servidor.', 'danger');
        console.error(error);
    }
});

cargarCategoria();