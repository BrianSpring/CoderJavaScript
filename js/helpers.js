// Función para mostrar errores en la página
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje
    });
}
document.getElementById('formAgregarProducto').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nuevoNombre').value;
    const precio = parseFloat(document.getElementById('nuevoPrecio').value);
    const imagen = document.getElementById('nuevoImagen').value;

    if (!nombre || isNaN(precio) || !imagen) {
        Swal.fire('Error', 'Por favor completa todos los campos correctamente.', 'error');
        return;
    }

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const nuevoId = productos.length ? productos[productos.length - 1].id + 1 : 1;

    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        precio: precio,
        imagen: imagen
    };

    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos)); // Guardar productos actualizados en localStorage

    mostrarProductos(); // Mostrar productos actualizados en la interfaz
    Swal.fire('Producto agregado', 'El producto fue agregado correctamente.', 'success');
    document.getElementById('formAgregarProducto').reset(); // Limpiar el formulario
});

// Función para mostrar productos
function mostrarProductos() {
    const productosContainer = document.querySelector('.productos-container');
    productosContainer.innerHTML = ''; // Limpiar contenido anterior
    const productos = JSON.parse(localStorage.getItem('productos')) || []; // Cargar productos del localStorage

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-card');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <p class="producto-nombre">${producto.nombre}</p>
            <p class="producto-precio">$${producto.precio}</p>
        `;
        productosContainer.appendChild(productoDiv);
    });
}

// Cargar productos al inicio
document.addEventListener('DOMContentLoaded', mostrarProductos);