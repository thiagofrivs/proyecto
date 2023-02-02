//PRODUCTOS

const productos=[
    //PROCESADORES
    {
        id: "procesador-01",
        titulo:"Procesador 01",
        imagen:"./img/procesadores/01.jpg",
        categoria:{
            nombre:"Procesadores",
            id:"procesadores"
        },
        precio:30000
    },
    {
        id: "procesador-02",
        titulo:"Procesador 02",
        imagen:"./img/procesadores/01.jpg",
        categoria:{
            nombre:"Procesadores",
            id:"procesadores"
        },
        precio:35000
    },
    {
        id: "procesador-03",
        titulo:"Procesador 03",
        imagen:"./img/procesadores/03.jpg",
        categoria:{
            nombre:"Procesadores",
            id:"procesadores"
        },
        precio:40000
    },
    {
        id: "procesador-04",
        titulo:"Procesador 04",
        imagen:"./img/procesadores/04.jpg",
        categoria:{
            nombre:"Procesadores",
            id:"procesadores"
        },
        precio:45000
    },
    {
        id: "procesador-05",
        titulo:"Procesador 05",
        imagen:"./img/procesadores/04.jpg",
        categoria:{
            nombre:"Procesadores",
            id:"procesadores"
        },
        precio:45000
    },

    //TECLADOS

    {
        id: "teclado-01",
        titulo:"Teclado 01",
        imagen:"./img/teclados/01.jpg",
        categoria:{
            nombre:"Teclados",
            id:"teclados"
        },
        precio:5000
    },
    {
        id: "teclado-02",
        titulo:"Teclado 02",
        imagen:"./img/teclados/02.jpg",
        categoria:{
            nombre:"Teclados",
            id:"teclados"
        },
        precio:6000
    },
    {
        id: "teclado-03",
        titulo:"Teclado 03",
        imagen:"./img/teclados/03.jpg",
        categoria:{
            nombre:"Teclados",
            id:"teclados"
        },
        precio:6000
    },
    {
        id: "teclado-04",
        titulo:"Teclado 04",
        imagen:"./img/teclados/04.jpg",
        categoria:{
            nombre:"Teclados",
            id:"teclados"
        },
        precio:7000
    },
    {
        id: "teclado-05",
        titulo:"Teclado 05",
        imagen:"./img/teclados/05.jpg",
        categoria:{
            nombre:"Teclados",
            id:"teclados"
        },
        precio:8000
    },

    //MONITORES
    {
        id: "monitor-01",
        titulo:"Monitor 01",
        imagen:"./img/monitores/01.jpeg",
        categoria:{
            nombre:"Monitores",
            id:"monitores"
        },
        precio:30000
    },
    {
        id: "monitor-02",
        titulo:"Monitor 02",
        imagen:"./img/monitores/02.jpeg",
        categoria:{
            nombre:"Monitores",
            id:"monitores"
        },
        precio:40000
    },
    {
        id: "monitor-03",
        titulo:"Monitor 03",
        imagen:"./img/monitores/03.jpeg",
        categoria:{
            nombre:"Monitores",
            id:"monitores"
        },
        precio:35000
    },
    {
        id: "monitor-04",
        titulo:"Monitor 04",
        imagen:"./img/monitores/04.jpeg",
        categoria:{
            nombre:"Monitores",
            id:"monitores"
        },
        precio:45000
    },
    {
        id: "monitor-05",
        titulo:"Monitor 05",
        imagen:"./img/monitores/05.jpeg",
        categoria:{
            nombre:"Monitores",
            id:"monitores"
        },
        precio:50000
    },

    //MEMORIAS

    {
        id: "mouse-01",
        titulo:"Mouse 01",
        imagen:"./img/mouses/01.jpeg",
        categoria:{
            nombre:"Mouses",
            id:"mouses"
        },
        precio:7000
    },
    {
        id: "mouse-02",
        titulo:"Mouse 02",
        imagen:"./img/mouses/02.jpeg",
        categoria:{
            nombre:"Mouses",
            id:"mouses"
        },
        precio:8000
    },
    {
        id: "mouse-03",
        titulo:"Mouse 03",
        imagen:"./img/mouses/03.png",
        categoria:{
            nombre:"Mouses",
            id:"mouses"
        },
        precio:8000
    },
    {
        id: "mouse-04",
        titulo:"Mouse 04",
        imagen:"./img/mouses/04.jpeg",
        categoria:{
            nombre:"Mouses",
            id:"mouses"
        },
        precio:8000
    },
    {
        id: "mouse-05",
        titulo:"Mouse 05",
        imagen:"./img/mouses/05.jpeg",
        categoria:{
            nombre:"Mouses",
            id:"mouses"
        },
        precio:10000
    },
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria=document.querySelectorAll(".boton-categoria")
const tituloPrincipal=document.querySelector("#titulo-principal")
let botonesAgregar= document.querySelectorAll(".producto-agregar")
const numerito=document.querySelector("#numerito")

function cargarProductos(productosElegidos){
    productosElegidos.forEach(producto => {

        const div=document.createElement("div")
        div.classList.add("producto")
        div.innerHTML=`
                        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">${producto.titulo}</h3>
                            <p class="producto-precio">$${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>
                        </div>`
        contenedorProductos.append(div)
        
        actualizaBotonesAgregar()
    })

}

cargarProductos(productos)

botonesCategoria.forEach(boton => {
    boton.addEventListener("click",(e) =>{

        contenedorProductos.innerHTML=""

        botonesCategoria.forEach(boton=>boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton)
            
            const productoCategoria = productos.find(producto =>  producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText=productoCategoria.categoria.nombre
        } else{
            tituloPrincipal.innerText="Todos los productos."
            cargarProductos(productos)
        }
        

        
    })
});

function actualizaBotonesAgregar(){
    botonesAgregar= document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton=>{
        boton.addEventListener("click",agregarAlCarrito)
    });
}
let productosEnCarrito = []
const productosEnCarritoLS=JSON.parse(localStorage.getItem("productos-en-carrito"))

if (productosEnCarritoLS){
    productosEnCarrito=productosEnCarritoLS
    actualizaNumerito()
}else{
    productosEnCarrito=[]
}



function agregarAlCarrito(e){
    const idBoton= e.currentTarget.id
    const productoAgregado = productos.find(producto=>producto.id===idBoton)
    

    if(productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad=1
        productosEnCarrito.push(productoAgregado)
    }
    console.log(productosEnCarrito)

    actualizaNumerito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
    Toastify({
        text: "Producto agregado!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#785ce9",
        },
    }).showToast();
}

function actualizaNumerito(){
    let nuevoNumerito= productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0)
    numerito.innerHTML=nuevoNumerito
}

