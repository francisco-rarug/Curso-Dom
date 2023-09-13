let carrito = [];

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

function addToCart(productId, productName) {
    const existingProduct = carrito.find(product => product.id === productId);
    
    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        carrito.push({ id: productId, name: productName, cantidad: 1 });
    }

    saveCartToStorage();
    document.querySelector('#contadorCarrito').textContent = carrito.length;
}

function removeFromCart(productId) {
    carrito = carrito.filter(product => product.id !== productId);
    saveCartToStorage();
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
    if (menuCarrito.style.display === 'none' || !menuCarrito.style.display) {
        actualizarMenuCarrito();
        menuCarrito.style.display = 'block';
    } else {
        menuCarrito.style.display = 'none';
    }
});

function actualizarMenuCarrito() {
    menuCarrito.innerHTML = ''; 
    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.textContent = `${producto.name}, Cantidad: ${producto.cantidad}`;
        menuCarrito.appendChild(item);
    });
}

export { carrito, menuCarrito, loadCartFromStorage, addToCart, removeFromCart, updateProductQuantity, actualizarMenuCarrito };



