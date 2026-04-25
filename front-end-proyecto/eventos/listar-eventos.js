const cargarEventos = async () => {
    const tBody = document.querySelector('#tablaEventos');
    try{
        const id = null;
        const response = await fetch('http://localhost:3000/api/eventos');
        const data = await response.json();
        const {eventos} = data;
        console.log(eventos);

        if(response.ok){
            tBody.innerHTML = eventos.map(evento => `
                <tr data-id="${evento._id}">
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.hora}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.categoria.nombre}</td>
                    <td>${evento.estado}</td>
                </tr>
            `).join('');

            return;
        }

        if(!response.ok){
            console.error('Error al cargar los eventos:', data.message);
            return;
        }

        if(!data.length==0){
            tBody.innerHTML = '<tr><td colspan="7">No hay eventos disponibles</td></tr>';
        }

    }catch (error) {
        console.error('Error al cargar los eventos:', error);
    }
}

const seleccionarEvento = (event) => {
    const fila = event.target.closest('tr');

    if (!fila || fila.closest('thead')) return;

    const todasLasCeldas = document.querySelectorAll('#tablaEventos td');
    todasLasCeldas.forEach(td => td.classList.remove('table-primary'));

    const celdasDeFila = fila.querySelectorAll('td');
    celdasDeFila.forEach(td => td.classList.add('table-primary'));

    id = fila.dataset.id;
};

const crearEvento = ()=>{
    window.location.href = 'registrar-evento.html';
}

const detalleDeEvento = ()=>{
    console.log(id)   
    if(id){
        window.location.href = `detalle-evento.html?id=${id}`;
    }
}


cargarEventos();