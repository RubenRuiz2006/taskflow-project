 const contenedor = document.getElementById("contenedor")
 const añadir= document.getElementById("botónAñadir")
 const ventanaAñadir = document.getElementById("ventanaAñadir")
const btnConfirmar = document.getElementById("botonConfirmar")
const section = document.getElementById("section")
let tareas=[];

const tareasGuardadas=localStorage.getItem(tareas);
const tareasConservadas= JSON.parse(tareasGuardadas) //aqui nos quedamos por hoy para implementar el localStorage y hay que hacer que cuando elimine alguna tarea se elimine del array tareas tambien

añadir.addEventListener("click", () =>{ //boton para ir a la ventana de añadir tarea
ventanaAñadir.style.display="flex";
contenedor.style.display="none"


})

btnConfirmar.addEventListener("click", () =>{
    const nombre=document.getElementById("nombre").value
    const categoría =document.getElementById("categoría").value
    const prioridad=document.getElementById("prioridad").value


if(nombre!="" && categoría!=""){ //me aseguro de que introduzcan esos datos
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


const btnQuitar = nuevaTarea.querySelector(".buttonQuitar")

btnQuitar.addEventListener("click", () => {
    nuevaTarea.remove()
})


document.getElementById("nombre").value=""
document.getElementById("categoría").value=""


ventanaAñadir.style.display="none"
contenedor.style.display="flex"

const tarea={ //aquí añadimos esta nueva tarea al array para guardarlo posteriormente en localstorage
    nombre: nombre,
    categoría: categoría,
    prioridad: prioridad};

tareas.push(tarea);
localStorage.setItem("tareas", JSON.stringify(tareas))

}else{
    alert("Debe rellenar cada campo")
}

})

