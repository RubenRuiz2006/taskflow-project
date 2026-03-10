 const contenedor = document.getElementById("contenedor")
 const añadir= document.getElementById("botonAñadir")
 const ventanaAñadir = document.getElementById("ventanaAñadir")
const btnConfirmar = document.getElementById("botonConfirmar")
const section = document.getElementById("section")

let tareas=[];


const botonTema = document.getElementById("botonTema");



const iconoLuna = `<svg id="iconoTema" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
</svg>`;

const iconoSol = `<svg id="iconoTema" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="5" stroke="currentColor" stroke-width="2"/>
  <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
  <line x1="1" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="2"/>
  <line x1="19" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
  <line x1="4" y1="4" x2="7" y2="7" stroke="currentColor" stroke-width="2"/>
  <line x1="17" y1="17" x2="20" y2="20" stroke="currentColor" stroke-width="2"/>
  <line x1="4" y1="20" x2="7" y2="17" stroke="currentColor" stroke-width="2"/>
  <line x1="17" y1="7" x2="20" y2="4" stroke="currentColor" stroke-width="2"/>
</svg>`;
if(localStorage.getItem("tema") === "oscuro"){
    document.body.classList.add("dark");
    botonTema.innerHTML = iconoSol;
} else {
    botonTema.innerHTML = iconoLuna;
}

// Listener del botón
botonTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Cambiar el icono según el modo
    if(document.body.classList.contains("dark")){
        botonTema.innerHTML = iconoSol;
        localStorage.setItem("tema", "oscuro");
    } else {
        botonTema.innerHTML = iconoLuna;
        localStorage.setItem("tema", "claro");
    }
});




const tareasGuardadas=localStorage.getItem("tareas"); //miramos si existen tareas guardadas en localStorage
if(tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas)
     tareas.forEach(t => {
        crearTarea(t.nombre, t.categoria, t.prioridad)
    })
} 

añadir.addEventListener("click", () =>{ //boton para ir a la ventana de añadir tarea
ventanaAñadir.style.display="flex";
contenedor.style.display="none";
})


function crearTarea(nombre, categoria, prioridad){ //función para solo crear la tarea en el DOM
    
const nuevaTarea = document.createElement("div");
nuevaTarea.className="tarea bg-yellow-100 w-150 h-30 flex items-center justify-between p-2.5 border border-black hover:bg-blue-200 transition duration-500";

const colorPrioridad={
    "Alta": "text-red-600",
    "Media":"text-orange-400",
    "Baja": "text-green-600"
}

nuevaTarea.innerHTML=`
<h2 class="text-3xl">${nombre}</h2>
<ul>
    <li><strong>Categoría:</strong> ${categoria}</li>
    <li class="${colorPrioridad[prioridad]}"><strong>Prioridad:</strong> ${prioridad}</li>
</ul>
<button class="buttonQuitar text-blue-500 cursor-pointer bg-gray-200 p-3 rounded border border-black hover:bg-indigo-600 hover:text-white transition duration-300 mr-3">Quitar</button>`
section.appendChild(nuevaTarea)


const btnQuitar = nuevaTarea.querySelector(".buttonQuitar")//dentro le añadimos el boton para eliminarlo

btnQuitar.addEventListener("click", () => { //boton para borrar cada tarea del DOM y del array
    nuevaTarea.remove()
   tareas = tareas.filter(t => t.nombre!=nombre)
   localStorage.setItem("tareas", JSON.stringify(tareas))
})


document.getElementById("nombre").value=""
document.getElementById("categoria").value=""


ventanaAñadir.style.display="none"
contenedor.style.display="flex"
}



btnConfirmar.addEventListener("click", () => { //para enviar el formulario
    const nombre = document.getElementById("nombre").value
    const categoria = document.getElementById("categoria").value
    const prioridad = document.getElementById("prioridad").value

    if (nombre.trim() != "" && categoria.trim() != "") { //me aseguro de que introduzcan esos datos

        const tarea = { //aquí añadimos esta nueva tarea al array para guardarlo posteriormente en localstorage
            nombre: nombre,
            categoria: categoria,
            prioridad: prioridad
        };

        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas))
        crearTarea(nombre, categoria, prioridad)

    } else {
        alert("Debe rellenar cada campo")
    }
})
