const taskService = require('../services/task.service'); //importa service para poder realizar la lógica mediante él

function obtenerTareas(req, res) { //estas funciones las crea para pasar los datos de manera apropiada a task.service para realizar su lógica
  const tareas = taskService.obtenerTodas();
  res.json(tareas);
}

function crearTarea(req, res) {
    const nombre    = req.body.nombre;
    const categoria = req.body.categoria;
    const prioridad = req.body.prioridad;
    const fecha     = req.body.fecha;

  // VALIDACIONES 
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: 'Nombre requerido' });
  }

  if (!categoria || categoria.trim() === "") {
    return res.status(400).json({ error: 'Categoría requerida' });
  }

  const nueva = taskService.crearTarea({
    nombre,
    categoria,
    prioridad,
    fecha
  });

  res.status(201).json(nueva);
}

function eliminarTarea(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new Error("BAD_REQUEST");
    }

    taskService.eliminarTarea(id);

    res.status(204).send();

  } catch (error) {
    next(error);
  }
}
module.exports = { //lo exporta para routes
  obtenerTareas,
  crearTarea,
  eliminarTarea
};
