# Backend — Taskflow API

## 1. Resumen

Servidor REST desarrollado con Node.js y Express que gestiona una lista de tareas. Expone una API con tres endpoints para obtener, crear y eliminar tareas. Los datos se almacenan en memoria durante la sesión del servidor.

**Tecnologías:** Node.js · Express · CORS · dotenv · nodemon

---

## 2. Estructura de archivos
```
server/
│
├─ src/
│   ├─ index.js                    # Punto de entrada del servidor
│   ├─ config/
│   │   └─ env.js                  # Carga variables de entorno
│   ├─ controllers/
│   │   └─ task.controller.js      # Valida datos y gestiona peticiones HTTP
│   ├─ routes/
│   │   └─ task.routes.js          # Mapea URLs a controladores
│   └─ services/
│       └─ task.service.js         # Lógica de negocio y persistencia en memoria
│
├─ .env                            # Variables de entorno (se introduce en gitignore para no subirlo a GitHub)
├─ .gitignore
└─ package.json
```

---

## 3. Instalación y uso
```bash
cd server
npm install
npm run dev
```

El servidor arranca en `http://localhost:3000`.

---

## 4. Variables de entorno

Crear un archivo `.env` en la carpeta `server/`:
```
PORT=3000
```

El archivo `.env` está en `.gitignore` y nunca se sube al repositorio.

---

## 5. Arquitectura por capas

El servidor sigue una separación estricta de responsabilidades:

**Routes** — recibe la petición HTTP y la dirige al controlador correcto. No contiene lógica.

**Controller** — extrae los datos de `req.body`, aplica validaciones y devuelve errores HTTP si los datos son incorrectos. Si son válidos, llama al service.

**Service** — contiene la lógica pura. No sabe nada de HTTP. Gestiona el array en memoria que actúa como base de datos provisional.

El flujo de una petición es siempre:
```
Cliente → Routes → Controller → Service → Controller → Cliente
```

---

## 6. Middlewares

**`cors()`** — Añade las cabeceras `Access-Control-Allow-Origin` para permitir peticiones desde orígenes distintos al del servidor, como el frontend en `localhost:5500`.

**`express.json()`** — Parsea el body de las peticiones entrantes de texto JSON a objeto JavaScript. Sin este middleware `req.body` estaría vacío.

**Middleware de errores `(err, req, res, next)`** — Captura cualquier error lanzado con `next(error)` en los controladores. Evalúa el mensaje del error y devuelve el código HTTP correspondiente. Nunca filtra detalles técnicos al cliente.
```javascript
app.use((err, req, res, next) => {
    if (err.message === "NOT_FOUND") return res.status(404).json({ error: "Recurso no encontrado" })
    if (err.message === "BAD_REQUEST") return res.status(400).json({ error: "Solicitud inválida" })
    return res.status(500).json({ error: "Error interno del servidor" })
})
```

---

## 7. API REST — Endpoints

**Base URL local:** `http://localhost:3000`  
**Base URL producción:** `https://taskflow-project-production-1498.up.railway.app`

### GET /api/v1/tasks
Obtiene todas las tareas almacenadas.
```
GET /api/v1/tasks

Respuesta 200:
[
  {
    "id": 1,
    "nombre": "Estudiar Express",
    "categoria": "programacion",
    "prioridad": "Alta",
    "estado": 0,
    "fecha": null
  }
]
```

### POST /api/v1/tasks
Crea una nueva tarea. `nombre` y `categoria` son obligatorios.
```
POST /api/v1/tasks
Content-Type: application/json

{
  "nombre": "Estudiar Express",
  "categoria": "programacion",
  "prioridad": "Alta",
  "fecha": "2026-03-25"
}

Respuesta 201:
{
  "id": 1,
  "nombre": "Estudiar Express",
  "categoria": "programacion",
  "prioridad": "Alta",
  "estado": 0,
  "fecha": "2026-03-25"
}

Respuesta 400: { "error": "Nombre requerido" }
Respuesta 400: { "error": "Categoría requerida" }
```

### DELETE /api/v1/tasks/:id
Elimina una tarea por su ID.
```
DELETE /api/v1/tasks/1

Respuesta 204: (sin body)
Respuesta 404: { "error": "Recurso no encontrado" }
Respuesta 400: { "error": "Solicitud inválida" }
```

---

## 8. Códigos HTTP utilizados

- `200` — petición correcta con datos devueltos
- `201` — recurso creado correctamente
- `204` — operación correcta sin contenido que devolver
- `400` — datos incorrectos o inválidos enviados por el cliente
- `404` — recurso no encontrado
- `500` — error interno del servidor

---
## 9. Resumen 
Cuando el frontend quiere hacer algo (obtener tareas, crear una, borrarla), llama a una función de client.js que hace un fetch a la URL del servidor en Vercel.

Esa petición llega a index.js, que es el punto de entrada del servidor. Ahí están los middlewares: cors() que permite la petición del frontend, y express.json() que convierte el body JSON en objeto JavaScript.

Luego index.js la manda a task.routes.js según la URL y el método HTTP. Si es GET, POST o DELETE, lo dirige al controlador correspondiente.

El controlador task.controller.js recibe la petición, extrae los datos del req.body, los valida y si algo está mal devuelve un error 400. Si todo es correcto llama al service.

El service task.service.js es donde está la lógica pura. Tiene un array en memoria que hace de base de datos provisional. Crea la tarea, la busca, la elimina. Si algo falla lanza un error.

Ese error sube hasta el middleware de errores al final de index.js, que decide si responder con 404, 400 o 500.
La respuesta viaja de vuelta al frontend como JSON, donde client.js la recibe y la convierte a objeto JavaScript para que code.js pueda usarla.

## 10. Autor

**Rubén Ruiz Mayorga**  
Email: ruben.ruiz@alu.ceacfp.es  
Fecha: 23/03/2026