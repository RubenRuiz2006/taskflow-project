let tasks =[]; // este arrya hará de base de datos provisional
let nextId = 1; //para dar un id distinto a cada tarea


function obtenerTodas (){ //la lógica de programa esta aquí
return tasks;
}

function crearTarea(data){
const nuevaTarea ={
    id: nextId++,
    nombre: data.nombre,
    categoria: data.categoria,
    prioridad: data.prioridad,
    estado:0, 
    fecha: data.fecha|| null

};
tasks.push(nuevaTarea);
return nuevaTarea;
}

function eliminarTarea(id){
const index = tasks.findIndex(t=>t.id === id);

if (index=== -1){
    throw new Error ("NOT_FOUND");
}else{
    tasks.splice(index, 1)
}
}
module.exports={ // lo exporta para controller
    obtenerTodas,
    crearTarea,
    eliminarTarea,
};
