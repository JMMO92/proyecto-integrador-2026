document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idEvento = params.get('id');

    if (!idEvento) {
        console.error("No hay ID");
        return;
    }

    console.log(idEvento);

    try {
        // En un entorno real, aquí haces el fetch a tu API:
        // const res = await fetch(`http://localhost:3000/eventos/${idEvento}`);
        // const evento = await res.json();

        // Simulando la respuesta basada en tu log de consola:
        const evento = {
            nombre: "Carrera de enanos",
            descripcion: "Carrera de hombres de baja estatura",
            fecha: "2026-04-25",
            hora: "15:12",
            lugar: "Tronadora",
            categoria: "Mascarada de Payasos y Cimarrona",
            estado: "Cancelado"
        };

        // Pintar en el HTML
        document.getElementById('detNombre').innerText = evento.nombre;
        document.getElementById('detDescripcion').innerText = evento.descripcion;
        document.getElementById('detFecha').innerText = evento.fecha;
        document.getElementById('detHora').innerText = evento.hora;
        document.getElementById('detLugar').innerText = evento.lugar;
        document.getElementById('detCategoria').innerText = evento.categoria;
        
        const badge = document.getElementById('detEstado');
        badge.innerText = evento.estado;
        
        // Estilo dinámico según estado
        if(evento.estado === 'Cancelado') badge.classList.add('bg-danger');
        else if(evento.estado === 'Activo') badge.classList.add('bg-success');

    } catch (error) {
        console.error("Error al cargar detalle:", error);
    }
});