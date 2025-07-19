// ============================================
// PROYECTO FINAL - TIENDA ONLINE
// Desarrollado por Thiago Santamaria
// Curso de JavaScript
// ============================================

// Variables globales para la aplicación
let productos = []; // Array donde guardo todos los productos

// La función cargarProductosDesdeFirestore se ejecuta desde el HTML
// y guarda los productos en window.productos

// Función principal que inicializa la app cuando se cargan los productos
function inicializarApp() {
    if (window.productos && window.productos.length > 0) {
        productos = window.productos;
        console.log("Productos cargados:", productos);
        generarFiltrosCategorias();
        cargarProductos(productos);
    } else {
        // Si no hay productos cargados, esperar un poco y reintentar
        setTimeout(inicializarApp, 100);
    }
}

// Función para generar los botones de filtro de categorías dinámicamente
function generarFiltrosCategorias() {
    // Obtener categorías únicas de los productos (sin repetir)
    const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria.nombre))];
    
    const contenedorFiltros = document.getElementById('filtros-categorias');
    if (!contenedorFiltros) return;
    
    // Limpiar el contenedor antes de agregar nuevos filtros
    contenedorFiltros.innerHTML = '';
    
    // Crear un botón para cada categoría
    categoriasUnicas.forEach(categoria => {
        const categoriaId = categoria.toLowerCase().replace(/\s+/g, ''); // Convertir a ID válido
        const li = document.createElement('li');
        li.innerHTML = `
            <button id="${categoriaId}" class="boton-menu boton-categoria">
                <i id="icon" class="bi bi-hand-index-thumb"></i>${categoria}
            </button>
        `;
        contenedorFiltros.appendChild(li);
    });
    
    // Agregar los event listeners a los nuevos botones
    actualizarEventListenersFiltros();
}

// Función para agregar los event listeners a los botones de filtro
function actualizarEventListenersFiltros() {
    const botonesCategoria = document.querySelectorAll(".boton-categoria");
    
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Limpiar el contenedor de productos
            contenedorProductos.innerHTML = "";

            // Quitar la clase active de todos los botones
            botonesCategoria.forEach(boton => boton.classList.remove("active"));
            // Agregar la clase active al botón clickeado
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos") {
                // Filtrar productos por categoría
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
                
                // Actualizar el título con el nombre de la categoría
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            } else {
                // Mostrar todos los productos
                tituloPrincipal.innerText = "Todos los productos.";
                cargarProductos(productos);
            }
        });
    });
}

// Inicializar la app cuando se cargue la página
document.addEventListener('DOMContentLoaded', inicializarApp);

// Elementos del DOM que uso frecuentemente
const contenedorProductos = document.querySelector("#contenedor-productos");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Función para mostrar los productos en la página
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpiar contenedor
    
    // Crear un elemento HTML para cada producto
    productosElegidos.forEach(producto => {
        console.log("Cargando producto:", producto.titulo);
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">${producto.titulo}</h3>
                            <p class="producto-precio">$${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>
                        </div>`;
        contenedorProductos.append(div);
        
        // Actualizar los botones después de agregar productos
        actualizaBotonesAgregar();
    });
}

// Función para agregar event listeners a los botones "Agregar"
function actualizaBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Array para guardar los productos en el carrito
let productosEnCarrito = [];

// Cargar productos del localStorage si existen
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizaNumerito();
} else {
    productosEnCarrito = [];
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    // Verificar si el producto ya está en el carrito
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Si ya existe, aumentar la cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Si no existe, agregarlo con cantidad 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    console.log(productosEnCarrito);

    // Actualizar el número del carrito
    actualizaNumerito();

    // Guardar en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    // Mostrar notificación de éxito
    Toastify({
        text: "Producto agregado!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#785ce9",
        },
    }).showToast();
}

// Función para actualizar el número del carrito
function actualizaNumerito() {
    // Sumar todas las cantidades de productos en el carrito
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = nuevoNumerito;
    
    // Actualizar también el numerito del menú hamburguesa
    const numeritoMenu = document.getElementById('numerito-menu');
    if (numeritoMenu) {
        numeritoMenu.innerHTML = nuevoNumerito;
    }
}

// ============================================
// MENÚ HAMBURGUESA PARA MÓVIL
// ============================================

// Elementos del menú hamburguesa
const menuHamburguesa = document.getElementById('menuHamburguesa');
const menuCategorias = document.querySelector('.items .menu');
const cerrarMenu = document.getElementById('cerrarMenu');

// Event listeners para el menú hamburguesa
if (menuHamburguesa && menuCategorias) {
    // Abrir menú
    menuHamburguesa.addEventListener('click', () => {
        menuCategorias.classList.toggle('activo');
    });
    
    // Cerrar menú con el botón X
    if (cerrarMenu) {
        cerrarMenu.addEventListener('click', () => {
            menuCategorias.classList.remove('activo');
        });
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuHamburguesa.contains(e.target) && !menuCategorias.contains(e.target)) {
            menuCategorias.classList.remove('activo');
        }
    });
}

