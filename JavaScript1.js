// Elementos del DOM Módulo 2
const formRecepcion = document.getElementById('form-recepcion');
const mensajeRecepcion = document.getElementById('mensaje-recepcion');

formRecepcion.addEventListener('submit', (e) => {
    e.preventDefault();

    const codigo = document.getElementById('codigo-recepcion').value.trim();
    const cantidadRecibida = parseInt(document.getElementById('cantidad-recibida').value);
    const costoUnitarioCompra = parseFloat(document.getElementById('costo-compra').value);

    // Reglas de Negocio: El producto debe existir 
    const producto = inventario.find(p => p.codigo === codigo);

    if (!producto) {
        mostrarMensajePersonalizado(mensajeRecepcion, "Error: El producto no existe.", "var(--error-color)");
        return;
    }

    // Regla de Negocio: Cantidad y costo > 0 
    if (cantidadRecibida <= 0 || costoUnitarioCompra <= 0) {
        mostrarMensajePersonalizado(mensajeRecepcion, "Error: Los valores deben ser mayores a 0.", "var(--error-color)");
        return;
    }

    // Cálculos de Costo Promedio Ponderado [cite: 27, 29, 30]
    const costoTotalAnterior = producto.costoTotal; 
    const costoNuevaCompra = cantidadRecibida * costoUnitarioCompra;
    const stockAnterior = producto.stockActual;

    const nuevoStock = stockAnterior + cantidadRecibida; [cite, 23]
    const nuevoCostoTotal = costoTotalAnterior + costoNuevaCompra; [cite, 24]
    const nuevoCostoPromedio = nuevoCostoTotal / nuevoStock; [cite, 25, 27]

    // Actualización del Inventario
    producto.stockActual = nuevoStock;
    producto.costoTotal = nuevoCostoTotal;
    producto.costoPromedio = nuevoCostoPromedio;

    mostrarMensajePersonalizado(mensajeRecepcion, `Recepción registrada. Nuevo stock: ${nuevoStock}`, "var(--success-color)");
    formRecepcion.reset();
});

// Función de mensaje reutilizable
function mostrarMensajePersonalizado(elemento, texto, color) {
    elemento.textContent = texto;
    elemento.style.backgroundColor = color;
    elemento.style.color = "white";
    elemento.style.display = "block";
    setTimeout(() => { elemento.style.display = "none"; }, 3000);
}