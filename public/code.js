window.addEventListener("DOMContentLoaded", () => {
const contenedor = document.getElementById("contenedor")
const btnAnadir = document.getElementById("botonAñadir")
const btnOrdenarPrioridad = document.getElementById("botonOrdenarPrioridad")
const ventanaAñadir = document.getElementById("ventanaAñadir")
const btnConfirmar = document.getElementById("botonConfirmar")
const section = document.getElementById("section")

const inputNombre = document.getElementById("nombre")
const inputCategoria = document.getElementById("categoria")
const selectPrioridad = document.getElementById("prioridad")

const botonTema = document.getElementById("botonTema");
const btnVolver = document.getElementById("btnVolver");

const overlay=document.getElementById("overlay")

function actualizarSinTareas(){
    const sinTareas=document.getElementById("sinTareas")
    if(tareas.length==0){
        sinTareas.classList.remove("hidden")
    }else{
        sinTareas.classList.add("hidden")
    }
}



if (!contenedor || !btnAnadir || !btnOrdenarPrioridad || !ventanaAñadir || !btnConfirmar || !section || !inputNombre || !inputCategoria || !selectPrioridad || !botonTema) {
    console.error("Faltan elementos en el DOM. Revisa los id en index.html.")
    return
}

/**
 * @typedef {"Baja"|"Media"|"Alta"} Prioridad
 */

/**
 * @typedef {Object} Tarea
 * @property {string} nombre
 * @property {string} categoria
 * @property {Prioridad} prioridad
 */

/** @type {Tarea[]} */
let tareas = [];



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
/**
 * Aplica el tema inicial guardado en `localStorage`.
 * - Si `tema === "oscuro"`, activa `.dark` y pone el icono de sol.
 * - En caso contrario, deja el modo claro y pone el icono de luna.
 * @returns {void}
 */
function aplicarTemaInicial() {
    if (localStorage.getItem("tema") === "oscuro") {
        document.body.classList.add("dark");
        botonTema.innerHTML = iconoSol;
    } else {
        botonTema.innerHTML = iconoLuna;
    }
}

btnVolver.addEventListener("click" , ()=>{ //botón el cual te permite volver a la pagina principal desde la ventana de ventanaAñadir
    ventanaAñadir.style.display="none";
    overlay.classList.add("hidden");
    limpiarFormulario();

})


/**
 * Alterna entre modo claro y oscuro y persiste la preferencia en `localStorage`.
 * @returns {void}
 */
function toggleTema() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        botonTema.innerHTML = iconoSol;
        localStorage.setItem("tema", "oscuro");
    } else {
        botonTema.innerHTML = iconoLuna;
        localStorage.setItem("tema", "claro");
    }
}

aplicarTemaInicial()
botonTema.addEventListener("click", toggleTema);




/**
 * Persiste el array `tareas` en `localStorage`.
 * @returns {void}
 */
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

/**
 * Carga tareas desde `localStorage`.
 * @returns {unknown[]}
 */
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas") // miramos si existen tareas guardadas en localStorage
    if (!tareasGuardadas) return []
    try {
        return JSON.parse(tareasGuardadas)
    } catch {
        return []
    }
}

/**
 * Normaliza una tarea antigua/externa a la forma actual.
 * Mantiene compatibilidad con la clave antigua `"categoría"`.
 * @param {any} t
 * @returns {Tarea}
 */


/**
 * Muestra la ventana/modal de alta de tarea y oculta el contenedor principal.
 * @returns {void}
 */
function abrirVentanaAñadir() {
    ventanaAñadir.style.display = "flex";
    overlay.classList.remove("hidden")

}

/**
 * Oculta la ventana/modal de alta de tarea y muestra el contenedor principal.
 * @returns {void}
 */
function cerrarVentanaAñadir() {
    ventanaAñadir.style.display = "none"
    contenedor.style.display = "flex"
    overlay.classList.add("hidden")
}

/**
 * Limpia los campos de entrada de la ventana de alta.
 * @returns {void}
 */
function limpiarFormulario() {
    inputNombre.value = ""
    inputCategoria.value = ""
    errorN.classList.add("hidden")
    errorC.classList.add("hidden")
    inputNombre.classList.remove("border-red-600")
    inputCategoria.classList.remove("border-red-600")
}

/**
 * Lee y valida mínimamente los datos del formulario (trim).
 * @returns {{nombre: string, categoria: string, prioridad: Prioridad}}
 */
function getDatosFormulario() {
    return {
        nombre: inputNombre.value.trim(),
        categoria: inputCategoria.value.trim(),
        prioridad: selectPrioridad.value,
    }
}

btnAnadir.addEventListener("click", abrirVentanaAñadir) // boton para ir a la ventana de añadir tarea
btnOrdenarPrioridad.addEventListener("click", ordenarPorPrioridad)


/**
 * Obtiene la clase CSS (Tailwind) para colorear por prioridad.
 * @param {Prioridad} prioridad
 * @returns {string}
 */
function getColorPrioridad(prioridad) {
    const colorPrioridad = {
        Alta: "text-red-600",
        Media: "text-orange-400",
        Baja: "text-green-600",
    }
    return colorPrioridad[prioridad] ?? ""
}

/**
 * Ordena el array `tareas` por prioridad (Alta → Media → Baja),
 * repinta la lista y persiste el nuevo orden.
 * @returns {void}
 */
function ordenarPorPrioridad() {
    /** @type {Record<Prioridad, number>} */
    const orden = { Alta: 0, Media: 1, Baja: 2 }

    tareas.sort((a, b) => (orden[a.prioridad] ?? 999) - (orden[b.prioridad] ?? 999))
    guardarTareas()

    section.innerHTML = ""
    tareas.forEach(renderTarea)
}

/**
 * Renderiza una tarea en el DOM y enlaza el botón de borrado.
 * @param {Tarea} tarea
 * @returns {void}
 */
function renderTarea({id, nombre, categoria, prioridad }) {
    const nuevaTarea = document.createElement("div");
    nuevaTarea.className =
        "tarea rounded bg-white w-full h-24 flex items-center justify-between px-6 p-2.5 border border-black hover:bg-cyan-100 transition duration-500";

    nuevaTarea.innerHTML = `
<h2 class="text-3xl text-cyan-700 textoB w-80">${nombre}</h2>
<ul class="flex-1 px-12">
    <li class="text-cyan-700 textoB"><strong>Categoría:</strong> ${categoria}</li>
    <li class="${getColorPrioridad(prioridad)}"><strong>Prioridad:</strong> ${prioridad}</li>
</ul>
<button class="buttonQuitar text-cyan-700 cursor-pointer bg-gray-200 p-3 rounded border border-black hover:bg-cyan-700 hover:text-white transition duration-300 mr-3">Quitar</button>`
    section.appendChild(nuevaTarea)

    const btnQuitar = nuevaTarea.querySelector(".buttonQuitar") // dentro le añadimos el boton para eliminarlo
    btnQuitar.addEventListener("click", () => {
        // boton para borrar cada tarea del DOM y del array
        nuevaTarea.remove()
        tareas = tareas.filter(t => t.id !== id)
        guardarTareas()
        actualizarSinTareas()
    })
}

/**
 * Crea una tarea, la añade a memoria, la persiste y la renderiza.
 * @param {string} nombre
 * @param {string} categoria
 * @param {Prioridad} prioridad
 * @returns {void}
 */
function crearTarea(nombre, categoria, prioridad) {
    const tarea = {id: Date.now(), nombre, categoria, prioridad }
    tareas.push(tarea)
    guardarTareas()
    renderTarea(tarea)
    actualizarSinTareas()
}



btnConfirmar.addEventListener("click", () => { //para enviar el formulario
    const { nombre, categoria, prioridad } = getDatosFormulario()

   const errorN= document.getElementById("errorN");
const errorC= document.getElementById("errorC");

errorN.classList.add("hidden");
errorC.classList.add("hidden");


let hayError = false;

if(nombre === ""){
    errorN.classList.remove("hidden")
    inputNombre.classList.add("border-red-600")
    hayError=true;
}else{
    inputNombre.classList.remove("border-red-600")
}
if(categoria === ""){
    errorC.classList.remove("hidden")
    inputCategoria.classList.add("border-red-600")
    hayError=true;
} else{
  inputCategoria.classList.remove("border-red-600")  
}
if(!hayError){
    crearTarea(nombre, categoria, prioridad)
    limpiarFormulario()
    cerrarVentanaAñadir()
}

})

/**
 * Inicializa la app: carga tareas desde storage y las pinta.
 * @returns {void}
 */
function init() {
    tareas = cargarTareas()
    tareas.forEach(renderTarea)
    actualizarSinTareas()
}

init()
})
