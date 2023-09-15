import { 
    menuCarrito, 
    loadCartFromStorage, 
    addToCart, 
    removeFromCart, 
    updateProductQuantity, 
    actualizarMenuCarrito,
    formatPrice
} from './carrito.js';

loadCartFromStorage();

const appNode = document.querySelector('#app');
const baseUrl = 'https://platzi-avo.vercel.app';

// Manejador de eventos para h2
appNode.addEventListener('click', (event) => {
    if (event.target.nodeName === "H2") {
        const userResponse = window.confirm('¿Deseas agregar este producto al carrito?');
        
        if (userResponse) {
            const productId = event.target.getAttribute('data-id');
            const productName = event.target.textContent;
            const productPrice = parseFloat(event.target.nextElementSibling.textContent.replace(/[^0-9.-]+/g,"")); 
            addToCart(productId, productName, productPrice);

            actualizarMenuCarrito(); 
        }
    }
});

// Fetch de la API
window.fetch(`${baseUrl}/api/avo`)
    .then(respuesta => respuesta.json())
    .then(responseJson => {
        const todosLosItems = [];

        // Crear elementos a partir de la respuesta JSON
        responseJson.data.forEach(item => {
            // Crear imagen
            const imagen = document.createElement('img');
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = "img";

            // Crear título y añadir el data-id
            const titulo = document.createElement('h2');
            titulo.textContent = item.name;
            titulo.setAttribute('data-id', item.id);
            titulo.className = "nombre";

            // Crear precio
            const precio = document.createElement('div');
            precio.textContent = formatPrice(item.price);
            precio.className = 'precio';

            // Crear contenedor
            const container = document.createElement('div');
            container.append(imagen, titulo, precio);
            container.className = "palta-container";

            todosLosItems.push(container);
        });

        appNode.append(...todosLosItems);
    });

menuCarrito.addEventListener('input', (event) => {
    if (event.target.classList.contains('cantidadProducto')) {
        const productId = event.target.getAttribute('data-id');
        const newQuantity = parseInt(event.target.value, 10);
        updateProductQuantity(productId, newQuantity);
        actualizarMenuCarrito();  
    }
});

menuCarrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminarProducto')) {
        const productId = event.target.getAttribute('data-id');
        removeFromCart(productId);
        actualizarMenuCarrito();  
    }
});

const carritoIcono = document.querySelector('#carritoIcono');
carritoIcono.appendChild(menuCarrito);


