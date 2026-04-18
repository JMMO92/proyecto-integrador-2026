# Requerimientos No Funcionales — LocalEvents

Plataforma web para el descubrimiento y gestión de eventos locales.

---

## RNF-01: Rendimiento

El sistema debe responder a las solicitudes del usuario en un tiempo máximo de 3 segundos bajo condiciones normales de uso.

**Métrica:** El tiempo de respuesta medido desde que el usuario realiza una acción hasta que el sistema muestra el resultado no debe superar los 3 segundos en una conexión estándar de banda ancha.

---

## RNF-02: Disponibilidad

El sistema debe estar disponible para su uso durante el periodo de evaluación del proyecto sin interrupciones planificadas.

**Métrica:** El servidor debe mantenerse activo durante las sesiones de demostración y evaluación sin caídas.

---

## RNF-03: Usabilidad

El sistema debe ser intuitivo y fácil de usar para personas sin conocimientos técnicos.

**Métrica:** Un usuario nuevo debe ser capaz de registrar un evento sin asistencia en un máximo de 3 minutos, navegando únicamente con los elementos de la interfaz.

---

## RNF-04: Validación de datos

El sistema debe validar los datos ingresados por el usuario antes de procesarlos, tanto en el frontend como en el backend.

**Métrica:** Ningún formulario debe permitir el envío de datos vacíos en campos obligatorios. El backend debe rechazar cualquier solicitud incompleta con un mensaje de error descriptivo y un código HTTP apropiado (400 para datos inválidos, 404 para recursos no encontrados, 500 para errores del servidor).

---

## RNF-05: Unicidad de datos

El sistema debe garantizar que no existan registros duplicados para campos definidos como únicos.

**Métrica:** El sistema debe rechazar el registro de un usuario con una cédula o correo ya existente, y el registro de una categoría con un nombre ya existente, retornando un mensaje de error claro al usuario.

---

## RNF-06: Mantenibilidad

El código debe estar organizado de forma modular y seguir las convenciones de nomenclatura definidas en el README, de manera que cualquier integrante del equipo pueda entender y modificar cualquier parte del proyecto.

**Métrica:** Cada funcionalidad debe estar separada en su propio archivo de rutas y modelo. No se permite lógica de negocio directamente en `server.js`.

---

## RNF-07: Compatibilidad

El frontend debe funcionar correctamente en los navegadores Google Chrome y Mozilla Firefox en sus versiones actuales.

**Métrica:** Todas las páginas del sistema deben visualizarse y funcionar correctamente en Chrome y Firefox sin errores de consola relacionados con compatibilidad.

---

## RNF-08: Seguridad básica

El sistema no debe exponer credenciales ni información sensible en el código fuente del repositorio.

**Métrica:** Las variables de entorno como la URI de MongoDB deben estar almacenadas en el archivo `.env`, el cual debe estar incluido en `.gitignore` y no debe aparecer en ningún commit del repositorio.
