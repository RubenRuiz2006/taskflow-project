 const contenedor = document.getElementById("contenedor")
 const añadir= document.getElementById("botónAñadir")
 const ventanaAñadir = document.getElementById("ventanaAñadir")
const btnConfirmar = document.getElementById("botonConfirmar")
const section = document.getElementById("section")
let tareas=[];

const tareasGuardadas=localStorage.getItem("tareas"); //miramos si existen tareas guardadas en localStorage
if(tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas)
     tareas.forEach(t => {
        crearTarea(t.nombre, t.categoría, t.prioridad)
    })
} 

añadir.addEventListener("click", () =>{ //boton para ir a la ventana de añadir tarea
ventanaAñadir.style.display="flex";
contenedor.style.display="none"
})


function crearTarea(nombre, categoría, prioridad){ //función para solo crear la tarea en el DOM
    
const nuevaTarea = document.createElement("div");
nuevaTarea.className="tarea";
nuevaTarea.innerHTML=`
<h2>${nombre}</h2>
<ul>
    <li><strong>Categoría:</strong> ${categoría}</li>
    <li class="${prioridad}"><strong>Prioridad:</strong> ${prioridad}</li>
</ul>
<button class="buttonQuitar">Quitar</button>`
section.appendChild(nuevaTarea)


const btnQuitar = nuevaTarea.querySelector(".buttonQuitar")//dentro le añadimos el boton para eliminarlo

btnQuitar.addEventListener("click", () => { //boton para borrar cada tarea del DOM y del array
    nuevaTarea.remove()
   tareas = tareas.filter(t => t.nombre!=nombre)
   localStorage.setItem("tareas", JSON.stringify(tareas))
})


document.getElementById("nombre").value=""
document.getElementById("categoría").value=""


ventanaAñadir.style.display="none"
contenedor.style.display="flex"
}



btnConfirmar.addEventListener("click", () => { //para enviar el formulario
    const nombre = document.getElementById("nombre").value
    const categoría = document.getElementById("categoría").value
    const prioridad = document.getElementById("prioridad").value

    if (nombre != "" && categoría != "") { //me aseguro de que introduzcan esos datos

        const tarea = { //aquí añadimos esta nueva tarea al array para guardarlo posteriormente en localstorage
            nombre: nombre,
            categoría: categoría,
            prioridad: prioridad
        };

        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas))
        crearTarea(nombre, categoría, prioridad)

    } else {
        alert("Debe rellenar cada campo")
    }
})
