window.addEventListener("DOMContentLoaded", () => {
const contenedor = document.getElementById("contenedor")
const btnAnadir = document.getElementById("botonAñadir")
const btnOrdenarPrioridad = document.getElementById("botonOrdenarPrioridad")
const ventanaAñadir = document.getElementById("ventanaAñadir")
const btnConfirmar = document.getElementById("botonConfirmar")
const section = document.getElementById("section")
const inputFecha = document.getElementById("fecha")

const inputNombre = document.getElementById("nombre")
const inputCategoria = document.getElementById("categoria")
const selectPrioridad = document.getElementById("prioridad")

const botonTema = document.getElementById("botonTema");
const btnVolver = document.getElementById("btnVolver");
   const errorN= document.getElementById("errorN");
const errorC= document.getElementById("errorC");

const botonFiltrar = document.getElementById("botonFiltrar")
const dropdownFiltro = document.getElementById("dropdownFiltro")
let filtroActual = "Todas"

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
 * @property {number} estado
 * 
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
    selectPrioridad.value="Baja"
    errorN.classList.add("hidden")
    errorC.classList.add("hidden")
    inputNombre.classList.remove("border-red-600")
    inputCategoria.classList.remove("border-red-600")
    inputFecha.value = ""
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
        fecha: inputFecha.value
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

function getFechaInfo(fecha) {
    if (!fecha) return null
    const hoy = new Date(); hoy.setHours(0,0,0,0)
    const d = new Date(fecha + 'T00:00:00')
    const diff = Math.round((d - hoy) / 86400000)
    const fmt = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
    if (diff < 0) return { texto: 'Vencida · ' + fmt, clase: 'text-red-700 bg-red-100 border-red-300' }
    if (diff === 0) return { texto: 'Hoy · ' + fmt, clase: 'text-orange-700 bg-orange-100 border-orange-300' }
    if (diff <= 3) return { texto: 'En ' + diff + 'd · ' + fmt, clase: 'text-orange-700 bg-orange-100 border-orange-300' }
    return { texto: 'Entrega · ' + fmt, clase: 'text-green-700 bg-green-100 border-green-300'} }
function renderTarea(tarea) {
    const {id, nombre, categoria, prioridad}=tarea
    const nuevaTarea = document.createElement("div");
    nuevaTarea.className =
        "tarea rounded bg-white w-full flex items-center justify-between px-6 py-3 border border-black hover:bg-cyan-100 transition duration-500";

    nuevaTarea.innerHTML = `
<h2 class="text-3xl text-cyan-700 textoB w-80">${nombre}</h2>
<ul class="flex-1 px-4 flex flex-col gap-1">
    <li class="text-cyan-700 textoB whitespace-nowrap"><strong>Categoría:</strong> ${categoria}</li>
    <li class="${getColorPrioridad(prioridad)}  whitespace-nowrap"><strong>Prioridad:</strong> ${prioridad}</li>
${tarea.fecha ? `<li class="text-sm"><span class="fecha inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getFechaInfo(tarea.fecha).clase} border">${getFechaInfo(tarea.fecha).texto}</span></li>` : ''}
    </ul><div class="flex flex-col items-center gap-1.5 mr-2">
   <button class="btnEstado btnEstadoE text-sm px-4 py-2 rounded border transition duration-300 bg-gray-200 text-cyan-700 border-black hover:text-white hover:bg-cyan-700 w-32" data-estado="0">Estado</button>

    <button class="buttonQuitar text-sm cursor-pointer bg-gray-200 text-cyan-700 border border-black px-4 py-2 rounded hover:bg-cyan-700 hover:text-white transition duration-300 w-32">Quitar</button>
</div>`
    section.appendChild(nuevaTarea)

const estados = [
    { label: 'Estado',     clase: 'bg-gray-200 text-cyan-700 border-black hover:bg-cyan-700' },
    { label: 'Pendiente',  clase: 'btnEstadoP bg-orange-200 text-orange-400 border-black hover:bg-orange-300 text-orange-700' },
    { label: 'En curso',   clase: 'btnEstadoEC bg-blue-100 text-blue-600 border-black hover:bg-blue-200' },
    { label: 'Completada', clase: 'btnEstadoC bg-green-200 text-green-600 border-black hover:bg-green-300' },
]

const btnEstado = nuevaTarea.querySelector(".btnEstado")

if (tarea.estado) {
    btnEstado.dataset.estado = tarea.estado
    btnEstado.className = `btnEstado text-sm px-4 py-2 rounded border transition duration-300 w-32 ${estados[tarea.estado].clase}`
    btnEstado.textContent = estados[tarea.estado].label
}

btnEstado.addEventListener("click", () => {
    const actual = parseInt(btnEstado.dataset.estado) 
const siguiente =actual === 0 ? 1 : (actual % 3) +1
    btnEstado.dataset.estado = siguiente
    btnEstado.className = `btnEstado text-sm px-4 py-2 rounded border transition duration-300 w-32 ${estados[siguiente].clase}`
    btnEstado.textContent = estados[siguiente].label
    btnEstado.classList.remove("btnEstadoE")
    const t = tareas.find(t => t.id === id)
    if (t) { t.estado = siguiente; guardarTareas() }
})


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
function crearTarea(nombre, categoria, prioridad, fecha) {
    const tarea = {id: Date.now(), nombre, categoria, prioridad, estado: 0, fecha }
    tareas.push(tarea)
    guardarTareas()
    if (filtroActual === "Todas" || tarea.prioridad === filtroActual) renderTarea(tarea)
    actualizarSinTareas()
}



btnConfirmar.addEventListener("click", () => { //para enviar el formulario
    const { nombre, categoria, prioridad, fecha } = getDatosFormulario()



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
    crearTarea(nombre, categoria, prioridad, fecha)
    limpiarFormulario()
    cerrarVentanaAñadir()
}

})


botonFiltrar.addEventListener("click", (e) => {
    e.stopPropagation()
    dropdownFiltro.classList.toggle("hidden")
})

document.addEventListener("click", () => {
    dropdownFiltro.classList.add("hidden")
})

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
        filtroActual = item.dataset.filtro
        botonFiltrar.textContent = filtroActual === "Todas" ? "Filtrar ▾" : filtroActual + " ▾"
        dropdownFiltro.classList.add("hidden")
        renderFiltrado()
    })
})

function renderFiltrado() {
    section.innerHTML = ""
    const filtradas = filtroActual === "Todas" ? tareas : tareas.filter(t => t.prioridad === filtroActual)
    filtradas.forEach(renderTarea)
    const sinTareas = document.getElementById("sinTareas")
    sinTareas.classList.toggle("hidden", filtradas.length > 0)
}


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
