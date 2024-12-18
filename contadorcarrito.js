let contadorCarrito = 0;

// Función para agregar un producto al carrito
function agregarAlCarrito() {
    contadorCarrito++; // Incrementar el contador
    actualizarContadorCarrito(); // Actualizar la visualización
}

// Función para actualizar el contador en el DOM
function actualizarContadorCarrito() {
    const contadorElemento = document.getElementById('carrito-contador');
    contadorElemento.textContent = contadorCarrito; // Mostrar el nuevo valor
}

// Simular clic en un botón para agregar al carrito
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
});

OPCION 1
<span id="carrito-contador" class="badge bg-danger position-absolute" style="top: 5px; right: 5px;">0</span>


#carrito-contador {
    position: absolute;
    top: -5px;
    right: -10px;
    font-size: 0.8rem;
    padding: 0.4rem;
    border-radius: 50%;
}


OPCION 2

let contador = 0;

function agregarAlCarrito() {
    contador++;
    document.getElementById('contador-carrito').textContent = contador;
}

function AbrirCarrito() {
    alert('Carrito abierto');
    // Aquí puedes agregar lógica para mostrar el carrito
}

<div id="cabecera">
    <img src="./assets/Logo TiaClola.jpg" width="196" height="90" alt="Logo Tiaclola" />
    <div style="display: flex; align-items: center; justify-content: flex-end;">
        <a id="carrito-tab" onclick="AbrirCarrito()" style="position: relative;">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 128 128">
                <path fill="#65878d" d="M95.84 41.06l-9.21.97l4.02-19.64a9.99 9.99 0 0 1 6.92-7.57l18.49-5.56c3.67-1.1 7.37 1.64 7.37 5.48c0 3.61-3.59 6.13-6.98 4.9l-2.57-.58l-10.36 3.07a6.02 6.02 0 0 0-4.13 4.34zm-9.55 41.69L79.88 110l-7.79-2.75l4.8-24.5z"/>
                <!-- Otros elementos del ícono -->
            </svg>
            <span id="contador-carrito" class="badge">0</span>
        </a>
    </div>
</div>

#contador-carrito {
    position: absolute;
    top: -8px; /* Ajusta según la posición deseada */
    right: -8px; /* Ajusta según la posición deseada */
    background-color: red;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 50%;
    padding: 3px 6px;
    min-width: 20px;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}