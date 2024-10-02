// Función para mostrar errores en la página
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje
    });
}
// Función para agregar un nuevo producto
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

    Swal.fire('Producto agregado', 'El producto fue agregado correctamente.', 'success');
    document.getElementById('formAgregarProducto').reset(); // Limpiar el formulario
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formAgregarProducto').addEventListener('submit', function(event) {
        // Función para agregar un nuevo producto
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

    Swal.fire('Producto agregado', 'El producto fue agregado correctamente.', 'success');
    document.getElementById('formAgregarProducto').reset(); // Limpiar el formulario
});
    });
});