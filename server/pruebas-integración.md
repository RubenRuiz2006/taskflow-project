Gracias a Postman me he asegurado que los paramentros Get Post y Delete funcionan adecuadamente.


- Con Post tras mandar los datos esenciales he recibido 
{
    "id": 1,
    "nombre": "estudiar",
    "categoria": "Programación",
    "prioridad": "alta",
    "estado": 0,
    "fecha": null
}
- Con Get me he asegurado de que existe esa tarea
- Con Delete he recibido 204 No Content y despues 
{
    "error": "Recurso no encontrado"
} 
al ya haberlo eliminado

- Al intentar hacer un Post pero sin el nombre me ha dado el error 400 Bad request y me ha aparecido 
{
    "error": "Nombre requerido"
}