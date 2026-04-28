const contenedorDetalleEvento = document.getElementById('contenedorDetalleEvento');

async function cargarDetalleEvento() {
    const parametros = new URLSearchParams(window.location.search);
    const idEvento = parametros.get('id');

    if (!idEvento) {
        contenedorDetalleEvento.innerHTML = `
            <div class="alert alert-danger" role="alert">
                No se recibió el identificador del evento.
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/${idEvento}`);
        const data = await response.json();

        if (!response.ok) {
            contenedorDetalleEvento.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${data.message || 'No se pudo cargar el detalle del evento.'}
                </div>
            `;
            return;
        }

        const evento = data.evento;

        contenedorDetalleEvento.innerHTML = `
            <article class="card shadow">
                <div class="card-body">
                    <h2 class="card-title">${evento.nombre}</h2>

                    <p class="card-text">
                        ${evento.descripcion}
                    </p>

                    <hr>

                    <p><strong>Fecha:</strong> ${evento.fecha}</p>
                    <p><strong>Hora:</strong> ${evento.hora}</p>
                    <p><strong>Lugar:</strong> ${evento.lugar}</p>
                    <p><strong>Categoría:</strong> ${evento.categoria ? evento.categoria.nombre : 'Sin categoría'}</p>
                    <p><strong>Estado:</strong> ${evento.estado}</p>

                    ${
                        evento.categoria
                            ? `<div class="alert alert-info mt-3">
                                <strong>Descripción de categoría:</strong> ${evento.categoria.descripcion}
                               </div>`
                            : ''
                    }
                </div>
            </article>
        `;

    } catch (error) {
        contenedorDetalleEvento.innerHTML = `
            <div class="alert alert-danger" role="alert">
                No se pudo conectar con el servidor.
            </div>
        `;
        console.error(error);
    }
}

cargarDetalleEvento();