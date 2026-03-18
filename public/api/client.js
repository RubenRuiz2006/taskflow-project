const BASE_URL = "http://localhost:3000/api/v1/tasks"

export async function getTareas() {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error("Error al obtener tareas")
    return res.json()
}

export async function crearTarea(datos) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    if (!res.ok) throw new Error("Error al crear tarea")
    return res.json()
}

export async function eliminarTarea(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
    if (!res.ok) throw new Error("Error al eliminar tarea")
}