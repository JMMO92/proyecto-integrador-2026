const formRegistrarUsuario = document.getElementById('formRegistrarUsuario');
const mensaje = document.getElementById('mensaje');

formRegistrarUsuario.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('txtNombre').value.trim();
    const cedula = document.getElementById('txtCedula').value.trim();
    const correo = document.getElementById('txtCorreo').value.trim();
    const tipoUsuario = document.getElementById('sltUsuario').value;

    if (!nombre || !cedula || !correo || !tipoUsuario) {
        mostrarMensaje('Todos los campos son obligatorios.', 'danger');
        return;
    }

    const usuario = {
        nombre,
        cedula,
        correo,
        tipoUsuario
    };

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarMensaje(data.message || 'No se pudo registrar el usuario.', 'danger');
            return;
        }

        mostrarMensaje('Usuario registrado correctamente.', 'success');
        formRegistrarUsuario.reset();

    } catch (error) {
        mostrarMensaje('Ocurrió un error al conectar con el servidor.', 'danger');
        console.error(error);
    }
});

function mostrarMensaje(texto, tipo) {
    mensaje.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}