# LocalEvents 🎉

Plataforma web fullstack para el descubrimiento y gestión de eventos locales (culturales, recreativos y sociales). Desarrollada como proyecto final del curso **Proyecto Integrador** del Técnico en Desarrollo de Software de **CENFOTEC**.

## Integrantes

- Rubén Cruz Gutiérrez
- Yariel Matarrita Rosales
- Jose Mondragón On

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express |
| Base de datos | MongoDB Atlas |
| Frontend | HTML, CSS, JavaScript |
| UI Framework | Bootstrap |

---

## Estructura del Proyecto

```
localevents/
├── back-end-proyecto/
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── .env             # Variables de entorno (no se sube al repo)
│   └── server.js        # Punto de entrada del servidor
└── front-end-proyecto/
    ├── js/              # Scripts de cada página
    └── *.html           # Páginas de la aplicación
```

---

## Instrucciones de instalación

### Requisitos previos

- Node.js (versión LTS)
- Cuenta en MongoDB Atlas

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/localevents.git
cd localevents
```

2. Instalar dependencias del backend:
```bash
cd back-end-proyecto
npm install
```

3. Crear el archivo `.env` en la carpeta `back-end-proyecto` con el siguiente contenido:
```
MONGODB_URI=tu_cadena_de_conexion_de_mongodb_atlas
PORT=3000
```

4. Arrancar el servidor:
```bash
node server.js
```

5. Abrir cualquier archivo `.html` de la carpeta `front-end-proyecto` con Live Server en VS Code.

---

## Convenciones de nomenclatura y formato de código

### Archivos y carpetas
- Archivos en minúsculas con guiones: `registrar-evento.html`, `eventos.route.js`
- Modelos con sufijo `.model.js`: `usuarios.model.js`
- Rutas con sufijo `.route.js`: `usuarios.route.js`

### JavaScript
- Variables y funciones en **camelCase**: `tipoUsuario`, `fechaEvento`
- Constantes en **UPPER_SNAKE_CASE**: `MONGODB_URI`, `PORT`
- Clases y modelos en **PascalCase**: `Usuario`, `Evento`, `Categoria`

### HTML
- IDs y clases en **kebab-case**: `id="registro-form"`, `class="lista-eventos"`

---

## Estrategia de branches y commits

### Branches

| Branch | Uso |
|--------|-----|
| `main` | Código estable y funcional. Solo se fusiona desde `dev`. |
| `dev` | Rama de integración. Todo el trabajo se fusiona aquí primero. |
| `feature/nombre-funcionalidad` | Una rama por funcionalidad. Ejemplo: `feature/filtro-por-categoria` |

### Flujo de trabajo

```
feature/mi-funcionalidad → dev → main
```

Nunca se hace commit directo a `main`.

---

## Tipos de commit

Los mensajes de commit siguen la siguiente convención:

```
tipo: descripción corta en minúsculas
```

| Tipo | Cuándo usarlo |
|------|--------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un bug |
| `docs` | Cambios en documentación |
| `style` | Cambios de formato (espacios, punto y coma, etc.) sin afectar lógica |
| `refactor` | Mejora de código sin cambiar funcionalidad |
| `test` | Agregar o modificar pruebas |
| `chore` | Tareas de mantenimiento (actualizar dependencias, etc.) |

### Ejemplos de commits

```
feat: agregar endpoint GET para listar eventos por categoría
fix: corregir validación de cédula duplicada en registro de usuario
docs: actualizar README con instrucciones de instalación
style: aplicar formato consistente en eventos.route.js
```

---

## Comandos útiles

```bash
# Arrancar el servidor
node server.js

# Instalar dependencias
npm install

# Actualizar npm
npm install -g npm@latest
```
