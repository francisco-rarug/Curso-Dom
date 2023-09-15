let carrito = [];

function formatPrice(price) {
    return new window.Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
    }).format(price);
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
        carrito = JSON.parse(savedCart);
    }
    document.querySelector('#contadorCarrito').textContent = carrito.length; 
}

function saveCartToStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function addToCart(productId, productName, productPrice) {
    const existingProduct = carrito.find(product => product.id === productId);
    
    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        carrito.push({ 
            id: productId, 
            name: productName, 
            price: productPrice,
            cantidad: 1 
        });
    }

    saveCartToStorage();
    document.querySelector('#contadorCarrito').textContent = carrito.length;
}


function removeFromCart(productId) {
    carrito = carrito.filter(product => product.id !== productId);
    saveCartToStorage();
    document.querySelector('#contadorCarrito').textContent = carrito.length;
}


function updateProductQuantity(productId, newQuantity) {
    const product = carrito.find(p => p.id === productId);
    if (product) {
        product.cantidad = newQuantity;
        saveCartToStorage();
    }
}

const carritoIcono = document.querySelector('#carritoIcono');
const menuCarrito = document.createElement('div');
menuCarrito.id = 'menuCarrito';

carritoIcono.addEventListener('click', () => {
    const distanciaDelBottom = window.innerHeight - carritoIcono.getBoundingClientRect().bottom;

    if (distanciaDelBottom < 300 && distanciaDelBottom < carritoIcono.getBoundingClientRect().top) { 
        
        menuCarrito.style.bottom = '100%'; 
        menuCarrito.style.top = 'auto';
    } else {
        menuCarrito.style.top = '100%'; 
        menuCarrito.style.bottom = 'auto';
    }

    if (menuCarrito.style.display === 'none' || !menuCarrito.style.display) {
        actualizarMenuCarrito();
        menuCarrito.style.display = 'block';
    } else {
        menuCarrito.style.display = 'none';
    }
});

function actualizarMenuCarrito() {
    menuCarrito.innerHTML = ''; // Limpiar menú
    carrito.forEach(producto => {
        const item = document.createElement('div');

        const nombreProducto = document.createElement('span');
        nombreProducto.textContent = `${producto.name}, Cantidad: ${producto.cantidad}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute('data-id', producto.id);
        botonEliminar.classList.add('eliminarProducto', 'btn-eliminar');


        item.appendChild(nombreProducto);
        item.appendChild(botonEliminar);
        menuCarrito.appendChild(item);

        const totalContainer = document.createElement('div');
        totalContainer.textContent = `Total: ${formatPrice(calcularTotal())}`; 
        menuCarrito.appendChild(totalContainer);

    });
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + (producto.price * producto.cantidad), 0);
}




export { carrito, calcularTotal, formatPrice, menuCarrito, loadCartFromStorage, addToCart, removeFromCart, updateProductQuantity, actualizarMenuCarrito };



