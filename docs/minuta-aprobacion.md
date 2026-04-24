# Minuta de Aprobación — LocalEvents

## Información General

| Campo | Detalle |
|-------|---------|
| Fecha | 6 de abril de 2025 |
| Lugar | Videollamada (Google Meet) |
| Duración | 60 minutos |
| Curso | Proyecto Integrador — Técnico en Desarrollo de Software, CENFOTEC |

---

## Participantes

| Nombre | Rol |
|--------|-----|
| María González | Cliente — Coordinadora de Eventos Culturales, Municipio de Heredia |
| Rubén Cruz Gutiérrez | Desarrollador — Equipo LocalEvents |
| Yariel Matarrita Rosales | Desarrollador — Equipo LocalEvents |
| Jose Mondragón On | Desarrollador — Equipo LocalEvents |

---

## Aspectos Tratados

### 1. Presentación del problema y propuesta de solución

El equipo de desarrollo presentó a la cliente la problemática identificada: la falta de una plataforma centralizada para el descubrimiento de eventos locales (culturales, recreativos y sociales) en el Municipio de Heredia, donde la difusión actualmente depende de medios informales y comunicación de boca a boca.

Se propuso **LocalEvents**, una plataforma web fullstack que permite registrar, gestionar y descubrir eventos locales a través de una interfaz intuitiva, sin requerir conocimientos técnicos por parte de los usuarios finales.

### 2. Revisión de actores del sistema

Se presentaron y validaron con la cliente los tres tipos de usuario del sistema:

- **Explorador:** usuario que descubre y consulta eventos.
- **Promotor:** usuario que publica y gestiona eventos.
- **Moderador:** usuario que administra categorías y supervisa el contenido.

La cliente confirmó que estos roles son suficientes para cubrir las necesidades del sistema.

### 3. Revisión de requerimientos funcionales

Se revisaron los 12 requerimientos funcionales propuestos (RF-01 al RF-12) con la cliente:

- **Gestión de usuarios (RF-01 al RF-04):** registro con nombre, cédula única, correo único y tipo de usuario; listado, actualización y eliminación.
- **Gestión de categorías (RF-05 al RF-06):** registro con nombre único, descripción y estado (Activa/Inactiva); listado completo.
- **Gestión de eventos (RF-07 al RF-09):** registro con nombre, descripción, fecha, hora, lugar, categoría y estado (Activo/Cancelado/Finalizado); listado general y detalle individual.
- **Filtros de búsqueda (RF-10 al RF-12):** filtro por categoría, filtro por fecha y consulta por estado.

La cliente aprobó todos los requerimientos funcionales sin modificaciones.

### 4. Revisión de requerimientos no funcionales

Se explicaron los compromisos de calidad del sistema:

- Tiempo de respuesta máximo de 3 segundos (RNF-01).
- Disponibilidad durante el periodo de evaluación (RNF-02).
- Interfaz intuitiva: un usuario nuevo puede registrar un evento en menos de 3 minutos (RNF-03).
- Validación de datos en frontend y backend con códigos HTTP apropiados (RNF-04).
- Unicidad garantizada en cédula, correo y nombre de categoría (RNF-05).
- Código modular con rutas y modelos separados por entidad (RNF-06).
- Compatibilidad con Chrome y Firefox en sus versiones actuales (RNF-07).
- Credenciales protegidas mediante archivo `.env` excluido del repositorio (RNF-08).

La cliente expresó satisfacción con los criterios de calidad propuestos.

### 5. Stack tecnológico

Se informó a la cliente sobre las tecnologías a utilizar:

- **Backend:** Node.js y Express para la API REST.
- **Base de datos:** MongoDB Atlas como base de datos NoSQL en la nube.
- **Frontend:** HTML, CSS, JavaScript y Bootstrap para la interfaz de usuario.

### 6. Observaciones y solicitudes de la cliente

- Solicitó que los filtros de búsqueda (por categoría, fecha y estado) sean accesibles de forma clara desde la interfaz, sin requerir conocimientos técnicos.
- Confirmó que el formato de fecha `YYYY-MM-DD` es aceptable para el ingreso y visualización de eventos.
- Solicitó que el estado de un evento refleje claramente si está disponible (Activo), fue cancelado (Cancelado) o ya ocurrió (Finalizado).

---

## Materiales Presentados

- Documento de requerimientos funcionales (`functional-requirements.md`) con 12 requerimientos medibles y verificables.
- Documento de requerimientos no funcionales (`non-functional-requirements.md`) con 8 criterios de calidad con métricas cuantificables.
- Prototipo de las páginas principales del sistema: registro y listado de usuarios, categorías y eventos, detalle de evento y páginas de filtros.
- Estructura del repositorio en GitHub con convenciones de nomenclatura, estrategia de branches y tipos de commit definidos en el `README.md`.

---

## Acuerdos

1. La cliente aprueba el alcance del sistema LocalEvents tal como fue presentado, confirmando que resuelve la necesidad de centralizar la información de eventos locales del municipio.
2. Se aprueba la estructura de tres roles de usuario: Explorador, Promotor y Moderador.
3. Se aprueba que los eventos tengan tres estados posibles: Activo, Cancelado y Finalizado.
4. Se aprueba que las categorías tengan estado Activa o Inactiva, con valor por defecto Activa.
5. Se acuerda que los filtros de búsqueda estarán disponibles como páginas independientes accesibles desde la interfaz.
6. Se acuerda que la cédula y el correo son campos únicos por usuario, y que el nombre es único por categoría.
7. El equipo de desarrollo se compromete a mantener las credenciales de base de datos fuera del repositorio público mediante el uso de `.env` y `.gitignore`.
8. La cliente autoriza el inicio del desarrollo con base en los requerimientos aprobados en esta reunión.

---

## Firma de Aprobación

El cliente confirma que el sistema propuesto por el equipo de desarrollo cumple con sus necesidades y aprueba el inicio del desarrollo tal como fue presentado en esta reunión.

&nbsp;

**María González**
Coordinadora de Eventos Culturales
Municipio de Heredia

Firma: ______________________________

Fecha: 6 de abril de 2025
