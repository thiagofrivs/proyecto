//TRAIGO LOS PRODUCTOS
let productos=''
fetch('./productos/productos.json')
.then((res)=>res.json())
.then((data)=>
{
    productos=data
    console.log(productos)
    cargarProductos(data)
})





const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria=document.querySelectorAll(".boton-categoria")
const tituloPrincipal=document.querySelector("#titulo-principal")
let botonesAgregar= document.querySelectorAll(".producto-agregar")
const numerito=document.querySelector("#numerito")

function cargarProductos(productosElegidos){

    productosElegidos.forEach(producto => {
        console.log("hola")
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
        position: "left", // `left`, `center` or `right`
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

