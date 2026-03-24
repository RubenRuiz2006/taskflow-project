# Gestor de Tareas

Aplicación web fullstack de gestión de tareas con frontend en HTML/CSS/JS y backend en Node.js + Express. Las tareas se gestionan a través de una API REST y se almacenan en memoria en el servidor.

# Tecnologías
**Frontend:** HTML · CSS · JavaScript ES6+ · TailwindCSS  
**Backend:** Node.js · Express · CORS · dotenv · nodemon  
**Despliegue:** Vercel (frontend + backend)

# Funciones
- Añadir tareas con nombre, categoría, prioridad y fecha opcional.
- Borrar tareas conectando con el backend.
- Estado de cada tarea: Pendiente → En curso → Completada.
- Ordenar tareas por prioridad.
- Filtrar tareas por prioridad.
- Fecha de entrega con indicador visual (vencida, hoy, próxima).
- Modo oscuro/claro con persistencia en localStorage.
- Estados de red: carga, éxito y error visual.

# Estructura de archivos
```
proyecto/
├── public/
│   ├── api/
│   │   └── client.js       -- capa de red: funciones fetch hacia el backend
│   ├── docs/
│   ├── code.js             -- lógica de la aplicación
│   ├── index.html          -- estructura de la interfaz
│   └── styles.css          -- estilos y modo oscuro
│
├── server/
│   └── src/
│       ├── config/
│       │   └── env.js              -- carga variables de entorno
│       ├── controllers/
│       │   └── task.controller.js  -- valida datos y gestiona peticiones
│       ├── routes/
│       │   └── task.routes.js      -- mapea URLs a controladores
│       ├── services/
│       │   └── task.service.js     -- lógica de negocio en memoria
│       └── index.js                -- punto de entrada del servidor
│
├── .gitignore
└── README.md
```

# Cómo ejecutar en local

**Backend:**
```bash
cd server
npm install
npm run dev
```
El servidor arranca en `http://localhost:3000`.

**Frontend:**
Abrir `public/index.html` con Live Server en VS Code (`http://localhost:5500`).

# Despliegue

- **Frontend:** https://taskflow-project-nwrp.vercel.app
- **Backend:** https://taskflow-server-azure.vercel.app

Ambos desplegados en Vercel, conectados al repositorio de GitHub y actualizados automáticamente con cada push.

# Middlewares

Tres middlewares registrados con `app.use()` entre la petición HTTP y la respuesta:

- **cors()** — Añade las cabeceras `Access-Control-Allow-Origin` para permitir peticiones desde orígenes distintos al servidor.
- **express.json()** — Parsea el body de las peticiones POST de texto JSON a objeto JavaScript, disponible en `req.body`.
- **Middleware de errores `(err, req, res, next)`** — Captura errores lanzados con `next(error)` y devuelve el código HTTP correcto: `NOT_FOUND` → 404, `BAD_REQUEST` → 400, cualquier otro → 500.

# Interacción con la API REST

**Obtener tareas:**
```
GET https://taskflow-server-azure.vercel.app/api/v1/tasks
```

**Crear tarea:**
```
POST https://taskflow-server-azure.vercel.app/api/v1/tasks
Content-Type: application/json

{ "nombre": "ejemploNombre", "categoria": "ejemploCategoria", "prioridad": "Alta" }
```

**Eliminar tarea:**
```
DELETE https://taskflow-server-azure.vercel.app/api/v1/tasks/:id
```

# Arquitectura por capas

**Routes** → recibe la petición y la dirige al controlador.  
**Controller** → valida los datos y llama al service.  
**Service** → lógica pura, gestiona el array en memoria.

El flujo siempre es:
```
Cliente → Routes → Controller → Service → Controller → Cliente
```

# Buenas prácticas
- Separación en capas: routes, controller, service.
- Validación en el controller antes de llegar al service.
- Middleware global de errores de 4 parámetros.
- Variables de entorno con dotenv, nunca hardcodeadas.
- `.env` en `.gitignore`.
- `trim()` en todos los inputs.
- Estados de red visuales: carga, éxito y error.

# Autor
Rubén Ruiz Mayorga  
Email: ruben.ruiz@alu.ceacfp.es  
Fecha: 24/03/2026