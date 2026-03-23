const express = require("express") //instancias herramientas para hacer el servidor
const cors = require("cors") //hace que el backend pueda recibir peticiones desde frontend
const config = require("./config/env") //recupera de tu carpeta .env el puerto (utilizando la libreria process.env)

const taskRoutes = require('./routes/task.routes'); //conecta con el archivo de routes que a su vez está conectado a controller que a su vez lo está a services

const app = express()// aquí creas el servidor

app.use(cors()) //middleware global, permite peticiones externas
app.use(express.json()) //transforma el json, por ejemplo: transforma el json { "nombre": "tarea" } en req.body.nombre

app.use('/api/v1/tasks', taskRoutes); //esta linea conecta todo el router al servidor, significa que Cualquier petición que empiece por:  /api/v1/tasks - la maneja taskRoutes 

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT || 3000}`);
});//se pone a escuchar el puerto


//errores, solo se ejecuta si alguien hace next(error)
app.use((err, req, res, next) => {
  console.error(err);

  if (err.message === "NOT_FOUND") {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  if (err.message === "BAD_REQUEST") {
    return res.status(400).json({ error: "Solicitud inválida" });
  }

  return res.status(500).json({
    error: "Error interno del servidor"
  });
});