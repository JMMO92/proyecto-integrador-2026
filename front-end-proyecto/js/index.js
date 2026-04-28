const seccionCarruselEventos = document.getElementById('seccionCarruselEventos');
const carouselEventosInner = document.getElementById('carouselEventosInner');

async function cargarCarruselEventos() {
    try {
        const response = await fetch('http://localhost:3000/api/eventos/activos/imagenes');
        const data = await response.json();

        if (!response.ok || !data.eventos || data.eventos.length === 0) {
            seccionCarruselEventos.style.display = 'none';
            return;
        }

        seccionCarruselEventos.style.display = 'block';
        carouselEventosInner.innerHTML = '';

        data.eventos.forEach((evento, index) => {
            const item = document.createElement('div');
            item.className = index === 0 ? 'carousel-item active' : 'carousel-item';

            item.innerHTML = `
                <img src="${evento.imagen}" class="d-block w-100" alt="Imagen del evento ${evento.nombre}" style="max-height: 420px; object-fit: cover;">

                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                    <h2 class="h5">${evento.nombre}</h2>
                    <p class="mb-1">${evento.descripcion}</p>
                    <p class="mb-0">
                        ${evento.fecha} | ${evento.lugar}
                    </p>
                </div>
            `;

            carouselEventosInner.appendChild(item);
        });

    } catch (error) {
        seccionCarruselEventos.style.display = 'none';
        console.error('Error al cargar carrusel:', error);
    }
}

cargarCarruselEventos();