async function cargarCategorias() {
    const tbody = document.querySelector('#tblCategorias tbody');

    try {
        const response = await fetch('http://localhost:3000/api/categorias');
        const data = await response.json();

        tbody.innerHTML = '';

        if (!response.ok) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center text-danger">
                        Error al cargar las categorías
                    </td>
                </tr>
            `;
            return;
        }

        if (!data.categorias || data.categorias.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center">
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
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-danger">
                    No se pudo conectar con el servidor
                </td>
            </tr>
        `;
        console.error(error);
    }
}

cargarCategorias();