# Gestor de Tareas

Una web de gestión de tareas, con diferenciación entre categorías y prioridades, haciendo que con localStorage las tareas guardadas perduren aunque recargues o cierres la pagina.

# Tecnologías
-HTML
-LocalStorage
-CSS
-JavaScript
-TailWind v4.2

# Funciones
-Añadir tareas con nombre, categoría y prioridad.
-Poder borrar esas tareas.
-Guardar esas tareas gracias a LocalStorage.
-Al abrir la página se cargaran las tareas de LocalStorage.
-Diseño responsive para móviles.
-Modo oscuro
-Opción en las tareas de poner el estado (pendiente, en curso, completada)
-Los estados perduran aunque se cierre o reinicie la página
-Boton para ordenar las tareas por prioridad
-Fecha de entrega

# Estructura de archivos
-`index.html` -- estructura de lainterfaz
-`styles.css` -- estilos personalizados y reglas del modo oscuro
-`code.js` -- toda la lógica de la web: crear, borrar y ordenar tareas

# Cómo ejecutar
1. Descarga el repositorio.
2. Abre `index.html` directamente en el navegador, no necesita servidor ni instalación.

# Autor
Rubén Ruiz Mayorga
email: ruben.ruiz@alu.ceacfp.es
Fecha: 12/03/2026

# Estructura del proyecto
proyecto/
├── .cursor/
├── node_modules/
├── public/
│ ├── docs/
│ │ ├── ai/
│ │ ├── ai-comparison.md
│ │ ├── cursor-workflow.md
│ │ ├── experiments.md
│ │ ├── prompt-engineering.md
│ │ └── reflection.md
│ ├── code.js
│ ├── index.html
│ └── styles.css
├── server/
│ ├── node_modules/
│ └── src/
│ ├── config/
│ │ └── env.js
│ ├── controllers/
│ │ └── task.controller.js
│ ├── routes/
│ │ └── task.routes.js
│ ├── services/
│ │ └── task.service.js
│ └── index.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── index.html (public)
└── README.md

# MiddleWares

En este proyecto hay 3 MiddleWares entre la petición HTTP y la respuesta que se recibe, registrándose con app.use().

- cors(): Cross-Origin Resource Sharing. Se activa cuando el navegador hace una petición desde un origen diferente, añadiendo las cabeceras HTTP necesarias, si no, no dejaría hacerlas.

- express.json(): Transforma las peticiones POST con formato JSON que llegan en texto plano, los parsea para transformarlos en objetos JavaScript para que sea accesible en req.body.

- MiddleWare de errores (err, req, res, next): Express lo reconoce como un manejador de errores por los cuatro parámetros, los centraliza todos y se ejecuta cuando se llama a next(error).

# Interacción con la API REST

- Obtener tareas:
GET https://taskflow-project-production-1498.up.railway.app/api/v1/tasks

- Crear tareas:
Post https://taskflow-project-production-1498.up.railway.app/api/v1/tasks
Content-Type: application/json

{ "nombre": "ejemploNombre", "categoria": "ejemploCategoria", "prioridad": "ejemploPrioridad" }

- Eliminar tarea:
DELETE https://taskflow-project-production-1498.up.railway.app/api/v1/tasks/(ID)

# Documentación elaborada por IA

# Lista de Tareas Interactiva — Prácticas

## 1. Resumen

Aplicación web de gestión de tareas desarrollada con HTML, CSS y JavaScript vanilla. Permite organizar tareas por nombre, categoría, prioridad y estado, con persistencia automática de datos y soporte para modo oscuro.

**Tecnologías:** HTML5 · CSS3 · JavaScript ES6+ · TailwindCSS v4 · LocalStorage

---

## 2. Estructura de Archivos
```
/proyecto
│
├─ index.html          # Interfaz principal
├─ styles.css          # Estilos generales y modo oscuro
├─ code.js             # Lógica de la aplicación
├─ .cursor/            # Configuración de Cursor AI / MCP
├─ node_modules/       # Dependencias (no subir al repositorio)
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ postcss.config.js   # Configuración de TailwindCSS
```

---

## 3. Funcionalidades

### Gestión de tareas
- **Añadir** tareas con nombre, categoría y prioridad (`Baja`, `Media`, `Alta`).
- **Eliminar** tareas individualmente con el botón *Quitar*.
- **Ordenar** por prioridad: `Alta → Media → Baja`.
- **Estado** de cada tarea con ciclo: `Pendiente → En curso → Completada`.

### Persistencia
- Todas las tareas y su estado se guardan en `localStorage`.
- El tema (claro/oscuro) también persiste entre sesiones.

### Diseño responsivo
- Layout basado en Flexbox con `max-width`, `min-width` y `w-full` para adaptarse a distintos tamaños de pantalla.
- Uso de `shrink-0` y `min-w-0` para evitar desbordamientos en pantallas pequeñas.
- Los elementos de cada tarea (nombre, detalles, botones) se reorganizan correctamente sin romper el diseño.

### Modo oscuro / claro
- Activado con un botón con icono dinámico (sol/luna).
- Implementado con la clase `body.dark` en CSS.
- Persistencia mediante `localStorage`.

---

## 4. Cómo usar la aplicación

1. Abrir `index.html` en un navegador moderno.
2. Pulsar **Añadir tarea** para abrir el formulario.
3. Rellenar nombre, categoría y prioridad, luego confirmar.
4. Usar el botón **Estado** en cada tarea para actualizar su progreso.
5. Ordenar tareas por prioridad con el botón correspondiente.
6. Cambiar entre modo claro y oscuro con el icono de la cabecera.
7. Todo se guarda automáticamente — los datos persisten al cerrar el navegador.

---

## 5. Uso de Cursor AI

Se recomienda Cursor AI para mejorar la productividad en el proyecto:

- **Documentación automática** de funciones y flujos.
- **Few-shot prompting**: dar ejemplos al modelo antes de pedir tareas complejas.
- **Refactorización**: renombrar variables o funciones globalmente.
- **Comparación de funciones**: determinar cuál es más eficiente.
- **MCP (Model Context Protocol)**: permite que la IA acceda al contexto real del proyecto.

---

## 6. Buenas prácticas aplicadas

- `trim()` en todos los inputs para evitar espacios innecesarios.
- Validación de campos antes de guardar cualquier tarea.
- IDs únicos con `Date.now()` para identificar y eliminar tareas de forma segura.
- Uso de `classList.add/remove` en lugar de `style.display` para compatibilidad con Tailwind.
- Separación clara entre lógica (code.js), estilos (styles.css) y estructura (index.html).

---

## 7. Autor

**Rubén Ruiz Mayorga**  
Email: ruben.ruiz@alu.ceacfp.es  
Fecha: 12/03/2026