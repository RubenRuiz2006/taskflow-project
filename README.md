# Gestor de Tareas

Una web de gestión de tareas, con diferenciación entre categorías y prioridades, haciendo que con localStorage las tareas guardadas perduren aunque recargues o cierres la pagina.

# Tecnologías
-HTML
-LocalStorage
-CSS
-JavaScript

# Funciones
-Añadir tareas con nombre, categoría y prioridad.
-Poder borrar esas tareas.
-Guardar esas tareas gracias a LocalStorage.
-Al abrir la página se cargaran las tareas de LocalStorage.
-Diseño responsive para móviles.
-Modo oscuro

# Estructura de archivos
-index.html (interfaz)
-styles.css (estilos)
-code.js (lógica de la web)

# Autor
Rubén Ruiz Mayorga
email: ruben.ruiz@alu.ceacfp.es

# Documentación elaborada por IA

# Lista de Tareas Interactiva

## 1. Resumen

Este proyecto es una **aplicación web de lista de tareas** con las siguientes características principales:

- Añadir tareas con **nombre, categoría y prioridad** (`Baja`, `Media`, `Alta`).  
- Ordenar tareas por **prioridad**.  
- **Persistencia de datos** usando `localStorage`.  
- **Modo oscuro/claro** configurable, con iconos dinámicos (sol/luna).  
- Interfaz dinámica usando **HTML, CSS y JavaScript**.  
- Estilos adaptados con **TailwindCSS**.

---

## 2. Estructura de Archivos
/proyecto
│
├─ .cursor/ # Configuración de IA / MCP para autocompletado (p. ej. mcp.json)
├─ node_modules/ # Dependencias de Node.js (no subir al repositorio, se reconstruye con package.json)
├─ .gitignore # Archivos/carpetas a ignorar en Git
├─ package.json # Configuración del proyecto Node
├─ package-lock.json # Registro exacto de versiones de dependencias
├─ postcss.config.js # Configuración de PostCSS / TailwindCSS
├─ index.html # Interfaz principal
├─ styles.css # Estilos generales y modo oscuro
└─ code.js # Lógica de la aplicación

## 3. Funcionalidades Principales

1. **Añadir Tareas**:  
   - Los usuarios pueden introducir `nombre`, `categoría` y `prioridad` de la tarea.  
   - Validación mínima para asegurar que no estén vacíos (`trim` aplicado a los inputs).  

2. **Eliminar Tareas**:  
   - Cada tarea tiene un botón de **Quitar**, que elimina la tarea del DOM y de `localStorage`.  

3. **Ordenar por Prioridad**:  
   - Prioridades: `Alta > Media > Baja`.  
   - Se actualiza el orden en el DOM y en `localStorage`.  

4. **Modo Claro / Oscuro**:  
   - Persistencia en `localStorage` de la preferencia del usuario.  
   - Icono dinámico que cambia entre sol y luna.  

5. **Persistencia con LocalStorage**:  
   - Todas las tareas se guardan y cargan automáticamente al abrir la página.  

6. **Compatibilidad con Cursor AI**:  
   - Se pueden usar prompts para generar documentación, revisar código, refactorizar variables o actualizar estilos.  

---

## 4. Uso de la Aplicación

1. Abrir `index.html` en un navegador moderno.  
2. Hacer clic en **Añadir tarea** para abrir el formulario.  
3. Introducir los datos de la tarea y confirmar.  
4. Ordenar tareas por prioridad usando el botón correspondiente.  
5. Cambiar entre **modo claro y oscuro** con el botón de tema.  
6. Las tareas y el tema se guardan automáticamente en `localStorage`.  

---

## 5. Uso de Cursor AI

Se recomienda usar **Cursor AI** para mejorar la productividad en el proyecto:

- **Autocompletado y documentación**:  
  - Explora el DOM, funciones y flujos de la app.  
  - Documenta automáticamente funciones y procesos.  

- **Few-shot prompting**:  
  - Dar ejemplos al modelo antes de pedirle tareas complejas para obtener mejores resultados.  

- **Prompts útiles**:  
  - Explica el código paso a paso.  
  - Sugiere mejoras de variables o funciones.  
  - Cambia estilos o nombres de variables globalmente.  
  - Compara funciones para determinar cuál es más eficiente.  

---

## 6. Buenas Prácticas y Notas

- Aplicar `trim()` en inputs para evitar cadenas vacías o espacios innecesarios.  
- Mantener consistente la estructura de archivos.  
- Validar campos importantes antes de guardar tareas.  
- Usar **TailwindCSS** para mantener un diseño profesional y responsivo.  
- Integrar MCP (Model Context Protocol) si se quiere usar IA para acceder a información del proyecto.  

---

## 7. Autor

Rubén Ruiz Mayorga  
Email: ruben.ruiz@alu.ceacfp.es  
Fecha: 10/3/2026