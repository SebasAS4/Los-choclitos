// Base de datos local (en memoria por ahora)
let inventario = [];

// Elementos del DOM
const formRegistro = document.getElementById('form-registro');
const mensajeRegistro = document.getElementById('mensaje-registro');

// Función para registrar producto
formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de datos
    const codigo = document.getElementById('codigo').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const stockInicial = parseInt(document.getElementById('stock-inicial').value);
    const costoUnitario = parseFloat(document.getElementById('costo-inicial').value);

    // Regla de Negocio: El código no debe repetirse
    const existe = inventario.find(p => p.codigo === codigo);
    if (existe) {
        mostrarMensaje("Error: El código del producto ya existe.", "var(--error-color)");
        return;
    }

    // Cálculos Iniciales según Módulo 1
    const costoTotalInicial = stockInicial * costoUnitario; // [cite: 15]
    const costoPromedioInicial = costoUnitario; // [cite: 16]

    // Crear objeto producto
    const nuevoProducto = {
        codigo: codigo,
        nombre: nombre,
        stockActual: stockInicial,
        costoPromedio: costoPromedioInicial,
        costoTotal: costoTotalInicial
    };

    // Guardar en el inventario global
    inventario.push(nuevoProducto);
    
    mostrarMensaje(`Producto "${nombre}" registrado con éxito.`, "var(--success-color)");
    formRegistro.reset();
    
    // Log para verificar en consola (útil para desarrollo)
    console.log("Inventario actualizado:", inventario);
});

// Función auxiliar para mensajes de feedback
function mostrarMensaje(texto, color) {
    mensajeRegistro.textContent = texto;
    mensajeRegistro.style.backgroundColor = color;
    mensajeRegistro.style.color = "white";
    mensajeRegistro.style.display = "block";
    
    setTimeout(() => {
        mensajeRegistro.style.display = "none";
    }, 3000);
}