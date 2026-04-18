const tbodyEventos = document.querySelector('#tblEventos tbody');
const sltFiltroCategoria = document.getElementById('sltFiltroCategoria');
const txtFiltroFecha = document.getElementById('txtFiltroFecha');
const sltFiltroEstado = document.getElementById('sltFiltroEstado');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');

let eventosGlobales = [];
let categoriasGlobales = [];

async function cargarCategoriasFiltro() {
    try {
        const response = await fetch('http://localhost:3000/api/categorias');
        const data = await response.json();

        sltFiltroCategoria.innerHTML = '<option value="">Todas las categorías</option>';

        if (response.ok && data.categorias) {
            categoriasGlobales = data.categorias;

            data.categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria._id;
                option.textContent = categoria.nombre;
                sltFiltroCategoria.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

async function cargarEventos() {
    try {
        const response = await fetch('http://localhost:3000/api/eventos');
        const data = await response.json();

        tbodyEventos.innerHTML = '';

        if (!response.ok) {
            tbodyEventos.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-danger">
                        Error al cargar los eventos
                    </td>
                </tr>
            `;
            return;
        }

        eventosGlobales = data.eventos || [];
        renderizarEventos(eventosGlobales);

    } catch (error) {
        tbodyEventos.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-danger">
                    No se pudo conectar con el servidor
                </td>
            </tr>
        `;
        console.error(error);
    }
}

function renderizarEventos(eventos) {
    tbodyEventos.innerHTML = '';

    if (!eventos || eventos.length === 0) {
        tbodyEventos.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    No hay eventos registrados
                </td>
            </tr>
        `;
        return;
    }

    eventos.forEach(evento => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${evento.nombre}</td>
            <td>${evento.descripcion}</td>
            <td>${evento.fecha}</td>
            <td>${evento.hora}</td>
            <td>${evento.lugar}</td>
            <td>${evento.categoria ? evento.categoria.nombre : 'Sin categoría'}</td>
            <td>${evento.estado}</td>
            <td>
                <a href="detalle-evento.html?id=${evento._id}" class="btn btn-sm btn-outline-primary">
                    Ver detalle
                </a>
            </td>
        `;

        tbodyEventos.appendChild(fila);
    });
}

function aplicarFiltros() {
    const categoriaSeleccionada = sltFiltroCategoria.value;
    const fechaSeleccionada = txtFiltroFecha.value;
    const estadoSeleccionado = sltFiltroEstado.value;

    let eventosFiltrados = [...eventosGlobales];

    if (categoriaSeleccionada) {
        eventosFiltrados = eventosFiltrados.filter(evento =>
            evento.categoria && evento.categoria._id === categoriaSeleccionada
        );
    }

    if (fechaSeleccionada) {
        eventosFiltrados = eventosFiltrados.filter(evento =>
            evento.fecha === fechaSeleccionada
        );
    }

    if (estadoSeleccionado) {
        eventosFiltrados = eventosFiltrados.filter(evento =>
            evento.estado === estadoSeleccionado
        );
    }

    renderizarEventos(eventosFiltrados);
}

function limpiarFiltros() {
    sltFiltroCategoria.value = '';
    txtFiltroFecha.value = '';
    sltFiltroEstado.value = '';
    renderizarEventos(eventosGlobales);
}

btnFiltrar.addEventListener('click', aplicarFiltros);
btnLimpiarFiltros.addEventListener('click', limpiarFiltros);

cargarCategoriasFiltro();
cargarEventos();