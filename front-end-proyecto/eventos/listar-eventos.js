// Definimos id de forma global para que sea accesible por todas las funciones
let idSeleccionado = null; 

const cargarEventos = async () => {
    const tBody = document.querySelector('#tablaEventos');
    try {
        const response = await fetch('http://localhost:3000/api/eventos');
        const data = await response.json();
        const { eventos } = data;

        if (response.ok) {
            if (eventos.length === 0) {
                tBody.innerHTML = '<tr><td colspan="7" class="text-center">No hay eventos disponibles</td></tr>';
                return;
            }

            tBody.innerHTML = eventos.map(evento => `
                <tr data-id="${evento._id}" style="cursor: pointer;">
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${new Date(evento.fecha).toLocaleDateString()}</td>
                    <td>${evento.hora}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.categoria?.nombre || 'Sin categoría'}</td>
                    <td>
                        <span class="badge ${evento.estado === 'Activo' ? 'bg-success' : 'bg-danger'}">
                            ${evento.estado}
                        </span>
                    </td>
                </tr>
            `).join('');
        } else {
            console.error('Error al cargar los eventos:', data.message);
        }
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
    }
}

const seleccionarEvento = (event) => {
    const fila = event.target.closest('tr');
    if (!fila || fila.closest('thead')) return;

    // Quitar clase de selección de todas las filas
    document.querySelectorAll('#tablaEventos tr').forEach(tr => {
        tr.querySelectorAll('td').forEach(td => td.classList.remove('table-primary'));
    });

    // Agregar clase a la fila actual
    fila.querySelectorAll('td').forEach(td => td.classList.add('table-primary'));

    // Guardar el ID en nuestra variable global
    idSeleccionado = fila.dataset.id;
    console.log("ID Seleccionado:", idSeleccionado);
};

// --- Funciones de Navegación ---

const crearEvento = () => {
    window.location.href = 'registrar-evento.html';
}

const detalleDeEvento = () => {
    if (!idSeleccionado) {
        alert("Por favor, seleccione un evento de la lista.");
        return;
    }
    window.location.href = `detalle-evento.html?id=${idSeleccionado}`;
}

const editarEvento = () => {
    if (!idSeleccionado) {
        alert("Por favor, seleccione un evento para editar.");
        return;
    }
    // Redirigimos al MISMO archivo de registro pero pasando el ID
    window.location.href = `registrar-evento.html?id=${idSeleccionado}`;
}

const eliminarEvento = async () => {
    if (!idSeleccionado) {
        alert("Seleccione un evento para eliminar.");
        return;
    }

    if (confirm("¿Está seguro de que desea eliminar este evento?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/eventos/${idSeleccionado}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Evento eliminado.");
                cargarEventos(); // Recargar la tabla
                idSeleccionado = null;
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }
}

// Inicializar
cargarEventos();