document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idEvento = params.get('id');

    if (!idEvento) {
        console.error("No se proporcionó un ID de evento en la URL");
        // Opcional: Redirigir al usuario si no hay ID
        // window.location.href = 'listar-eventos.html';
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/api/eventos/${idEvento}`);
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();

        if (data.estado === 'ok' && data.evento) {
            const evento = data.evento;

            document.getElementById('detNombre').innerText = evento.nombre;
            document.getElementById('detDescripcion').innerText = evento.descripcion;
            
            const fechaFormateada = new Date(evento.fecha).toLocaleDateString();
            document.getElementById('detFecha').innerText = fechaFormateada;
            
            document.getElementById('detHora').innerText = evento.hora;
            document.getElementById('detLugar').innerText = evento.lugar;
            
            document.getElementById('detCategoria').innerText = 
                evento.categoria?.nombre || evento.categoria || 'Sin categoría';
            
            const badge = document.getElementById('detEstado');
            badge.innerText = evento.estado;
            
            badge.classList.remove('bg-danger', 'bg-success', 'bg-warning');
            
            if (evento.estado === 'Cancelado') {
                badge.classList.add('bg-danger');
            } else if (evento.estado === 'Activo') {
                badge.classList.add('bg-success');
            } else {
                badge.classList.add('bg-secondary');
            }
        } else {
            console.error("Evento no encontrado en la base de datos");
            alert("El evento que buscas no existe.");
        }

    } catch (error) {
        console.error("Error al cargar detalle desde el servidor:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
});

RegresarAEventos = () => {
  window.location.href = 'listar-eventos.html';
}