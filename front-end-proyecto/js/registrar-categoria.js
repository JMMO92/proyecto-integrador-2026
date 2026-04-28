const formRegistrarCategoria = document.getElementById('formRegistrarCategoria');
const mensajeCategoria = document.getElementById('mensajeCategoria');

formRegistrarCategoria.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('txtNombreCategoria').value.trim();
    const descripcion = document.getElementById('txtDescripcionCategoria').value.trim();
    const estado = document.getElementById('sltEstadoCategoria').value;

    if (!nombre || !descripcion || !estado) {
        mostrarMensajeCategoria('Todos los campos son obligatorios.', 'danger');
        return;
    }

    const categoria = {
        nombre,
        descripcion,
        estado
    };

    try {
        const response = await fetch('http://localhost:3000/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensajeCategoria(data.message || 'No se pudo registrar la categoría.', 'danger');
            return;
        }

        mostrarMensajeCategoria('Categoría registrada correctamente.', 'success');
        formRegistrarCategoria.reset();

    } catch (error) {
        mostrarMensajeCategoria('Ocurrió un error al conectar con el servidor.', 'danger');
        console.error(error);
    }
});

function mostrarMensajeCategoria(texto, tipo) {
    mensajeCategoria.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}