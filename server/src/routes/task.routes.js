const express = require('express');
const router = express.Router(); //se crea la constante para despues poder exportarla a index para que quede a la escucha de un /

const taskController = require('../controllers/task.controller'); //importa de controller para que cuando reciba alguna indicación de post, get o delete se la pase a él

router.get('/', taskController.obtenerTareas); //los tipos de peticiones
router.post('/', taskController.crearTarea);
router.delete('/:id', taskController.eliminarTarea);

module.exports = router; //exporta para index.js