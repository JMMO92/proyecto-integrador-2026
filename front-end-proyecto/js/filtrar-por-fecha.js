async function filtrar() {
    const fecha = document.getElementById('inputFecha').value;
    const tbody = document.querySelector('#tblEventos tbody');

    if (!fecha) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-warning">
                    Debe seleccionar una fecha
                </td>
            </tr>
        `;
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/eventos/filtro/fecha?fecha=${fecha}`);
        const data = await response.json();
        tbody.innerHTML = '';

        if (!data.eventos || data.eventos.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No hay eventos en esa fecha
                    </td>
                </tr>
            `;
            return;
        }

        data.eventos.forEach(evento => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${evento.nombre}</td>
                <td>${evento.fecha}</td>
                <td>${evento.hora}</td>
                <td>${evento.lugar}</td>
                <td>${evento.categoria ? evento.categoria.nombre : 'Sin categoría'}</td>
                <td>${evento.estado}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    No se pudo conectar con el servidor
                </td>
            </tr>
        `;
        console.error(error);
    }
}