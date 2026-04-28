async function cargarUsuarios() {
    const tbody = document.querySelector('#tblUsuarios tbody');

    try {
        const response = await fetch('http://localhost:3000/api/usuarios');
        const data = await response.json();

        tbody.innerHTML = '';

        if (!response.ok) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-danger">
                        Error al cargar los usuarios
                    </td>
                </tr>
            `;
            return;
        }

        if (!data.usuarios || data.usuarios.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        No hay usuarios registrados
                    </td>
                </tr>
            `;
            return;
        }

        data.usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.cedula}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.tipoUsuario}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="editarUsuario('${usuario.cedula}')">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario.cedula}')">
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

async function eliminarUsuario(cedula) {
    const confirmar = confirm('¿Desea eliminar este usuario?');

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/cedula/${cedula}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'No se pudo eliminar el usuario.');
            return;
        }

        cargarUsuarios();

    } catch (error) {
        alert('No se pudo conectar con el servidor.');
        console.error(error);
    }
}

function editarUsuario(cedula) {
    window.location.href = `editar-usuario.html?cedula=${cedula}`;
}

cargarUsuarios();