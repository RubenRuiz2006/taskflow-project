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

Aplicación web fullstack de gestión de tareas desarrollada con HTML, CSS y JavaScript vanilla en el frontend, y Node.js con Express en el backend. Permite organizar tareas por nombre, categoría, prioridad y estado, con persistencia de datos en servidor y soporte para modo oscuro.

**Tecnologías frontend:** HTML5 · CSS3 · JavaScript ES6+ · TailwindCSS · Fetch API  
**Tecnologías backend:** Node.js · Express · CORS · dotenv · nodemon  
**Despliegue:** Vercel (frontend) · Railway (backend)

---

## 2. Estructura de Archivos
```
/proyecto
│
├─ public/
│   ├─ index.html          # Interfaz principal
│   ├─ styles.css          # Estilos generales y modo oscuro
│   ├─ code.js             # Lógica de la aplicación
│   └─ api/
│       └─ client.js       # Capa de red: funciones fetch hacia el backend
│
├─ server/
│   ├─ src/
│   │   ├─ index.js        # Punto de entrada del servidor Express
│   │   ├─ config/
│   │   │   └─ env.js      # Carga y exporta variables de entorno
│   │   ├─ controllers/
│   │   │   └─ task.controller.js  # Recibe peticiones HTTP y valida datos
│   │   ├─ routes/
│   │   │   └─ task.routes.js      # Mapea URLs a controladores
│   │   └─ services/
│   │       └─ task.service.js     # Lógica de negocio y persistencia en memoria
│   ├─ .env                # Variables de entorno (no subir a GitHub)
│   └─ package.json
│
├─ .gitignore
└─ README.md
```

---

## 3. Arquitectura por capas

El backend sigue una arquitectura de tres capas separadas por responsabilidad:

**Routes** → recibe la petición HTTP y la dirige al controlador correcto.  
**Controller** → extrae y valida los datos del `req.body`. Si son incorrectos devuelve un error HTTP. Si son correctos llama al service.  
**Service** → contiene la lógica pura. Gestiona el array en memoria que actúa como base de datos provisional.

---

## 4. Middlewares

Un middleware es una función que se ejecuta entre que llega la petición HTTP y que se envía la respuesta. Se registran con `app.use()` y se ejecutan en orden.

**`cors()`** — Añade las cabeceras `Access-Control-Allow-Origin` necesarias para que el navegador permita peticiones desde un origen diferente (por ejemplo desde `localhost:5500` al servidor en `localhost:3000`).

**`express.json()`** — Parsea el body de las peticiones POST de texto JSON a objeto JavaScript, disponible en `req.body`.

**Middleware de errores** `(err, req, res, next)` — Captura cualquier error lanzado con `next(error)` en los controladores. Mapea el mensaje del error al código HTTP correcto: `NOT_FOUND` → 404, `BAD_REQUEST` → 400, cualquier otro → 500.

---

## 5. API REST — Endpoints

**Base URL:** `https://taskflow-project-production-1498.up.railway.app`

### GET /api/v1/tasks
Obtiene todas las tareas.
```
GET /api/v1/tasks
Respuesta 200: [ { id, nombre, categoria, prioridad, estado, fecha } ]
```

### POST /api/v1/tasks
Crea una nueva tarea.
```
POST /api/v1/tasks
Content-Type: application/json

{ "nombre": "Estudiar", "categoria": "trabajo", "prioridad": "Alta" }

Respuesta 201: { id, nombre, categoria, prioridad, estado: 0, fecha: null }
Respuesta 400: { "error": "Nombre requerido" }
```

### DELETE /api/v1/tasks/:id
Elimina una tarea por ID.
```
DELETE /api/v1/tasks/1

Respuesta 204: (sin body)
Respuesta 404: { "error": "Recurso no encontrado" }
```

---

## 6. Funcionalidades del frontend

- **Añadir** tareas con nombre, categoría, prioridad y fecha opcional.
- **Eliminar** tareas individualmente conectando con el backend.
- **Ordenar** por prioridad: `Alta → Media → Baja`.
- **Filtrar** por prioridad con dropdown.
- **Estado** de cada tarea con ciclo: `Pendiente → En curso → Completada`.
- **Fecha de entrega** con indicador visual (vencida, hoy, próxima).
- **Modo oscuro/claro** con persistencia en localStorage.
- **Estados de red**: indicador de carga, éxito y error visual si el servidor no responde.

---

## 7. Cómo ejecutar en local

**Backend:**
```bash
cd server
npm install
npm run dev
```
El servidor arranca en `http://localhost:3000`.

**Frontend:**
Abrir `public/index.html` con Live Server en VS Code (`http://localhost:5500`).

---

## 8. Despliegue

- **Frontend:** Vercel, conectado al repositorio de GitHub. Se actualiza automáticamente con cada push.
- **Backend:** Railway, con `Root Directory` apuntando a `server/`. Usa `npm start` para producción.

---

## 9. Buenas prácticas aplicadas

- Separación clara en capas: routes, controller, service.
- Validación de datos en el controller antes de llegar al service.
- Manejo global de errores con middleware de 4 parámetros.
- Variables de entorno con dotenv, nunca hardcodeadas.
- `.env` en `.gitignore` para no exponer datos sensibles.
- `trim()` en todos los inputs del frontend.
- Gestión visual de estados de red: carga, éxito y error.

---

## 10. Autor

**Rubén Ruiz Mayorga**  
Email: ruben.ruiz@alu.ceacfp.es  
Fecha: 20/03/2026