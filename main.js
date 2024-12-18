const API_URL = "https://example.com/api/products"; // URL de la API
const cartKey = "shoppingCart"; // Clave para LocalStorage

let cart = {};
let productos = [];
// Variable para almacenar el conteo de productos en el carrito


// Función para cargar productos desde la API
 function fetchJSONDataAndRender() {
     fetch("./jsonProductos.json")
         .then((res) => {
            if (!res.ok) {
                 throw new Error
                     (`HTTP error! Status: ${res.status}`);
            }
             return res.json();
         })
         .then((data) => {
             productos = data
             console.log(productos)
             renderProducts(productos)
     })
     .catch((error) =>
         console.error("Unable to fetch data:", error));
 }

function LimpiarCarrito(){
    localStorage.setItem(cartKey, JSON.stringify([]));
    const cartItems = document.getElementById("cart-items");
    while (cartItems.firstChild) {        
        const deleteButton = cartItems.firstChild.querySelector('.btn.btn-danger');    
        if (deleteButton) {            
            deleteButton.click();
        }
    }
    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = "0.00";
    renderCart()
}

// Función para renderizar la lista de productos
function renderProducts(nuevosProductos) {
   // Selección del contenedor de productos
   const container = document.getElementById("containerProductos");

   // Renderizar productos dinámicamente
   nuevosProductos.forEach((producto) => {
   const card = document.createElement("div");
   card.classList.add("card");

   card.innerHTML = `
       <a href="#">
       <img src="${producto.imagen}" class='imagenPopup' alt="${producto.nombre}">
       <div class="item">
           <h5>${producto.nombre}</h5>
           <p>${producto.descripcion}</p>
           <p>$ ${producto.precio.toLocaleString()}</p>
           <buttom class="btn btn-warning add-to-cart" style="margin-bottom:10px" >Agregar al carrito</buttom>
       </div>
       </a>
   `;

   const addToCartButton = card.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
        addToCart(producto.id, producto.nombre, producto.precio);
    });

    
    const imagePopup = card.querySelector('.imagenPopup');
    imagePopup.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor click behavior

        // Select modal elements
        const modalTitle = document.getElementById('myModalLabel');
        const modalBody = document.querySelector('#myModal .modal-body');

        // Set modal content
        modalTitle.textContent = producto.nombre;
        modalBody.textContent = producto.descripcion;

        // Show the modal
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    });

   container.appendChild(card);
   });
}

// Función para añadir productos al carrito
function addToCart(productId, productName, productPrice) {
    if (cart[productId]) {
        cart[productId].quantity++;
    } else {
        cart[productId] = { id: productId, name: productName, price: productPrice, quantity: 1 };
    }
    saveCartToLocalStorage();
    renderCart();
}

// Función para eliminar productos del carrito
function removeFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
    }
    saveCartToLocalStorage();
    renderCart();
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productId, quantity) {
    if (cart[productId]) {
        cart[productId].quantity = Number(quantity);
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
    }
    saveCartToLocalStorage();
    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";

    let total = 0;

    Object.values(cart).forEach(item => {
        const row = document.createElement("tr");
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" class="form-control" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Eliminar</button>
            </td>
        `;
        cartItems.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Función para guardar el carrito en LocalStorage
function saveCartToLocalStorage() {
    localStorage.removeItem(cartKey); 
    renderCart();
}

// Función para cargar el carrito desde LocalStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    renderCart();
}

function AgregarProducto(nombre,precio){

    var idmax = Math.max(productos.map(x=> x.id));

    var nuevoProducto = {
        "id": idmax + 1,
        "nombre": nombre,
        "precio": precio,
        "imagen": "",
    }

    productos.push(nuevoProducto)

    console.log(productos)

    renderProducts([nuevoProducto])
}

function AbrirCarrito() {    
    const myModal = new bootstrap.Modal(document.getElementById('modalCarrito'));
    myModal.show();
}

// Inicializar la aplicación
async function init() {    
    loadCartFromLocalStorage();
    fetchJSONDataAndRender();
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});


