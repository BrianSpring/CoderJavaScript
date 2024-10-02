// Variables
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let historial = JSON.parse(localStorage.getItem('historial')) || [];
let productos = [];

// Función para cargar productos desde el JSON
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');
        const productosJson = await response.json();
        productos = productosJson; // Asignar productos del JSON

        // Cargar productos del localStorage
        const productosLocalStorage = JSON.parse(localStorage.getItem('productos')) || [];
        // Combinar ambos arrays, asegurando que no haya duplicados
        productos = [...productos, ...productosLocalStorage];
        mostrarProductos(); // Mostrar productos en la interfaz
    } catch (error) {
        mostrarError('No se pudieron cargar los productos. Intenta más tarde.');
    }
}

// Función para mostrar productos en el index.html
function mostrarProductos() {
    const productosContainer = document.querySelector('.productos-container');
    productosContainer.innerHTML = ''; // Limpiar contenido anterior

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-card');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <p class="producto-nombre">${producto.nombre}</p>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="agregarCarrito" data-id="${producto.id}">Agregar al carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });

    // Añadir eventos a los botones de agregar al carrito
    document.querySelectorAll('.agregarCarrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoContainer = document.querySelector('.carrito-container');
    carritoContainer.innerHTML = ''; // Limpiar contenido anterior
    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button class="eliminarProducto" data-index="${index}">Eliminar</button>
        `;
        carritoContainer.appendChild(productoDiv);
    });

    // Añadir eventos a los botones de eliminar producto
    document.querySelectorAll('.eliminarProducto').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    });
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
    const index = parseInt(event.target.getAttribute('data-index'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para finalizar la compra y registrar en el historial
function comprar() {
    if (carrito.length === 0) {
        Swal.fire('Tu carrito está vacío.');
        return;
    }

    const total = calcularTotal();
    Swal.fire({
        title: '¿Confirmar compra?',
        text: `Total: $${total}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            registrarCompra();
            Swal.fire('¡Compra realizada!', `Gracias por tu compra. Total: $${total}`, 'success');
            carrito = [];
            localStorage.removeItem('carrito');
            mostrarCarrito();
        }
    });
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Función para registrar la compra en el historial
function registrarCompra() {
    const compra = {
        productos: [...carrito],
        total: calcularTotal(),
        fecha: new Date().toLocaleString()
    };
    historial.push(compra);
    localStorage.setItem('historial', JSON.stringify(historial));
}

// Función para mostrar el historial de compras
function mostrarHistorial() {
    const historialContainer = document.querySelector('.historial-container');
    historialContainer.innerHTML = ''; // Limpiar contenido anterior
    historial.forEach((compra, index) => {
        const compraDiv = document.createElement('div');
        compraDiv.innerHTML = `
            <p>Compra #${index + 1} - ${compra.fecha}</p>
            <p>Total: $${compra.total}</p>
            <ul>
                ${compra.productos.map(p => `<li>${p.nombre} - $${p.precio}</li>`).join('')}
            </ul>
        `;
        historialContainer.appendChild(compraDiv);
    });
}

// Cargar productos al inicio
document.addEventListener('DOMContentLoaded', cargarProductos); // Cargar productos desde JSON y localStorage al inicio

// Inicialización: mostrar carrito y mostrar historial
mostrarCarrito();
mostrarHistorial();

// Evento para el botón de comprar
document.querySelector('.boton-comprar').addEventListener('click', comprar);
