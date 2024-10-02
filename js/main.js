// Variables
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let historial = JSON.parse(localStorage.getItem('historial')) || [];
let productos = JSON.parse(localStorage.getItem('productos')) || []; // Cargar productos desde localStorage

// Función para mostrar productos en el index.html
function mostrarProductosIndex() {
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

// Cargar productos al inicio en el index.html
document.addEventListener('DOMContentLoaded', mostrarProductosIndex);

// Inicialización: cargar carrito y historial
mostrarCarrito();
mostrarHistorial(); // Asegúrate de tener la función mostrarHistorial en tu archivo
