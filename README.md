# sis257_ferreteria
1. Descripción del proyecto

Este proyecto tiene como objetivo diseñar la estructura inicial de una base de datos para la *Ferretería Bicentenario*, un negocio dedicado a la venta de materiales de construcción, herramientas, pinturas y artículos ferreteros en general.

La Ferretería Bicentenario es una empresa ubicada en la ciudad de Sucre, Bolivia. Su principal actividad es la comercialización de artículos de ferretería al por menor. El sistema de base de datos propuesto busca facilitar la gestión de productos, ventas, proveedores y clientes de forma eficiente y ordenada.

2. Entidades y Campos Tentativos

1. productos
- id
- codigo
- descripcion
- precio_venta
- cantidad
- unidad_medida
- id_categoria
- id_proveedor
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

2. categorias
- id
- nombre
- descripcion
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

3. proveedores
- id
- nit
- razon_social
- telefono
- direccion
- representante
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

4. clientes
- id
- nombre
- ci_nit
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

5. ventas
- id
- fecha
- id_cliente
- id_usuario
- transaccion
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

6. ventas_detalles
- id
- id_venta
- id_producto
- cantidad
- precio_unitario
- total
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

7. usuarios
- id
- usuario
- contraseña
- id_empleado
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

---

8. empleados
- id
- ci
- nombre
- paterno
- materno
- direccion
- celular
- cargo
- usuario_registro
- fecha_creacion
- fecha_modificacion
- fecha_eliminacion

