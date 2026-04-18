# Requerimientos Funcionales — LocalEvents

Plataforma web para el descubrimiento y gestión de eventos locales.

---

## RF-01: Registro de usuario

El sistema debe permitir registrar un nuevo usuario con los siguientes campos obligatorios:
- Nombre completo
- Cédula (única por usuario)
- Correo electrónico (único por usuario)
- Tipo de usuario (Explorador, Promotor, Moderador)

**Criterio de verificación:** Al registrar un usuario con todos los campos válidos, el sistema responde con confirmación y el usuario queda almacenado en la base de datos. Si la cédula o el correo ya existen, el sistema rechaza el registro con un mensaje de error.

---

## RF-02: Listado de usuarios

El sistema debe mostrar todos los usuarios registrados con su nombre, cédula, correo y tipo de usuario.

**Criterio de verificación:** Al acceder a la página de listado, se muestran todos los usuarios almacenados en la base de datos.

---

## RF-03: Actualización de usuario

El sistema debe permitir actualizar los datos de un usuario existente (nombre, correo y tipo de usuario) identificándolo por su cédula.

**Criterio de verificación:** Al actualizar un usuario con datos válidos, el sistema confirma la operación y los cambios se reflejan en la base de datos.

---

## RF-04: Eliminación de usuario

El sistema debe permitir eliminar un usuario identificándolo por su cédula.

**Criterio de verificación:** Al eliminar un usuario existente, el sistema confirma la operación y el usuario ya no aparece en el listado.

---

## RF-05: Registro de categoría

El sistema debe permitir registrar una nueva categoría de evento con los siguientes campos obligatorios:
- Nombre (único)
- Descripción
- Estado (Activa / Inactiva), con valor por defecto "Activa"

**Criterio de verificación:** Al registrar una categoría con todos los campos válidos, el sistema confirma el registro. Si el nombre ya existe, el sistema rechaza el registro con un mensaje de error.

---

## RF-06: Listado de categorías

El sistema debe mostrar todas las categorías registradas con su nombre, descripción y estado.

**Criterio de verificación:** Al acceder a la página de listado, se muestran todas las categorías almacenadas en la base de datos.

---

## RF-07: Registro de evento

El sistema debe permitir registrar un nuevo evento con los siguientes campos obligatorios:
- Nombre del evento
- Descripción
- Fecha y hora
- Lugar
- Categoría (seleccionada de las categorías registradas)
- Estado (Activo, Cancelado, Finalizado), con valor por defecto "Activo"

**Criterio de verificación:** Al registrar un evento con todos los campos válidos, el sistema confirma el registro y el evento queda almacenado en la base de datos.

---

## RF-08: Listado general de eventos

El sistema debe mostrar todos los eventos registrados con su nombre, fecha, lugar, categoría y estado.

**Criterio de verificación:** Al acceder a la página de listado, se muestran todos los eventos almacenados en la base de datos.

---

## RF-09: Detalle de evento

El sistema debe permitir ver el detalle completo de un evento individual, mostrando todos sus campos.

**Criterio de verificación:** Al seleccionar un evento del listado, se muestra una página con toda la información del evento.

---

## RF-10: Filtro de eventos por categoría

El sistema debe permitir filtrar el listado de eventos por categoría.

**Criterio de verificación:** Al seleccionar una categoría, el listado muestra únicamente los eventos que pertenecen a esa categoría.

---

## RF-11: Filtro de eventos por fecha

El sistema debe permitir filtrar el listado de eventos por fecha.

**Criterio de verificación:** Al ingresar una fecha, el listado muestra únicamente los eventos programados para ese día.

---

## RF-12: Consulta de eventos por estado

El sistema debe permitir filtrar el listado de eventos por estado (Activo, Cancelado, Finalizado).

**Criterio de verificación:** Al seleccionar un estado, el listado muestra únicamente los eventos que tienen ese estado.
