async function cargarCategorias() {
    const tbody = document.querySelector('#tblCategorias tbody');

    try {
        const response = await fetch('http://localhost:3000/api/categorias');
        const data = await response.json();

        tbody.innerHTML = '';

        if (!response.ok) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-danger">
                        Error al cargar las categorías
                    </td>
                </tr>
            `;
            return;
        }

        if (!data.categorias || data.categorias.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        No hay categorías registradas
                    </td>
                </tr>
            `;
            return;
        }

        data.categorias.forEach(categoria => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion}</td>
                <td>${categoria.estado}</td>
                <td>
                    <a href="editar-categoria.html?id=${categoria._id}" class="btn btn-sm btn-warning me-2">
                        ✏️ Editar
                    </a>
                    <button class="btn btn-sm btn-danger" onclick="eliminarCategoria('${categoria._id}')">
                        🗑️ Eliminar
                    </button>
                </td>
            `;

            tbody.appendChild(fila);
        });

    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    No se pudo conectar con el servidor
                </td>
            </tr>
        `;
        console.error(error);
    }
}

async function eliminarCategoria(id) {
    const confirmar = confirm('¿Desea eliminar esta categoría?');

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'No se pudo eliminar la categoría.');
            return;
        }

        cargarCategorias();

    } catch (error) {
        alert('No se pudo conectar con el servidor.');
        console.error(error);
    }
}

cargarCategorias();