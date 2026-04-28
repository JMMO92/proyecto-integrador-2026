const formEditarUsuario = document.getElementById('formEditarUsuario');
const mensaje = document.getElementById('mensaje');

const txtNombre = document.getElementById('txtNombre');
const txtCedula = document.getElementById('txtCedula');
const txtCorreo = document.getElementById('txtCorreo');
const sltUsuario = document.getElementById('sltUsuario');

const parametros = new URLSearchParams(window.location.search);
const cedula = parametros.get('cedula');

function mostrarMensaje(texto, tipo) {
    mensaje.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

async function cargarUsuario() {
    if (!cedula) {
        mostrarMensaje('No se recibió la cédula del usuario.', 'danger');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/cedula/${cedula}`);
        const data = await response.json();

        if (!response.ok) {
            mostrarMensaje(data.message || 'No se pudo cargar el usuario.', 'danger');
            return;
        }

        txtNombre.value = data.usuario.nombre;
        txtCedula.value = data.usuario.cedula;
        txtCorreo.value = data.usuario.correo;
        sltUsuario.value = data.usuario.tipoUsuario;

    } catch (error) {
        mostrarMensaje('No se pudo conectar con el servidor.', 'danger');
        console.error(error);
    }
}

formEditarUsuario.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = txtNombre.value.trim();
    const correo = txtCorreo.value.trim();
    const tipoUsuario = sltUsuario.value;

    txtCorreo.classList.remove('is-invalid');

    if (!nombre || !correo || !tipoUsuario) {
        mostrarMensaje('Todos los campos son obligatorios.', 'danger');
        return;
    }

    if (!validarCorreo(correo)) {
        txtCorreo.classList.add('is-invalid');
        mostrarMensaje('El correo no tiene un formato válido.', 'danger');
        return;
    }

    const usuarioActualizado = {
        nombre,
        correo,
        tipoUsuario
    };

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/cedula/${cedula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioActualizado)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensaje(data.message || 'No se pudo actualizar el usuario.', 'danger');
            return;
        }

        mostrarMensaje('Usuario actualizado correctamente.', 'success');

        setTimeout(() => {
            window.location.href = 'listar-usuarios.html';
        }, 1200);

    } catch (error) {
        mostrarMensaje('No se pudo conectar con el servidor.', 'danger');
        console.error(error);
    }
});

cargarUsuario();