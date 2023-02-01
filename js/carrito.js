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





let productosEnCarrito= JSON.parse(localStorage.getItem("productos-en-carrito"))
const contenedorCarritoVacio=document.querySelector("#carrito-vacio")
const contenedorCarritoProductos=document.querySelector("#carrito-productos")
const contenedorCarritoAcciones=document.querySelector("#carrito-acciones")
const contenedorCarritoComprado=document.querySelector("#carrito-comprado")
const textoTotal=document.querySelector("#total")
const botonVaciar=document.querySelector("#vaciar-carrito")
const botonComprar=document.querySelector("#boton-comprar")

console.log(productosEnCarrito)
let total=0

function agregarHTML(){
    if (productosEnCarrito){

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML=""

        productosEnCarrito.forEach(producto => {
            

            const div=document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-titulo">
                                <small>Título</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$${producto.precio*producto.cantidad}</p>
                            </div>
                            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`
            contenedorCarritoProductos.append(div)


            const botonEliminar=document.querySelector(`#${producto.id}`)

            botonEliminar.addEventListener("click",(e)=>{
                let boton = e.currentTarget.id
                
                Swal.fire({
                    title: '¿Desea eliminar este producto?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Eliminar',
                    denyButtonText: `Conservar`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire('Producto eliminado!', '', 'success')
                      sacarDelCarrito(boton)
                    } else if (result.isDenied) {
                      Swal.fire('El producto seguirá en el carrito', '', 'info')
                    }
                  })
            })
            
        });

        actualizaTotal(total)
        
        
    }
}

agregarHTML()


botonVaciar.addEventListener("click",(e)=>{
    Swal.fire({
        title: '¿Desea vaciar el carrito?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Vaciar carrito',
        denyButtonText: `Conservar carrito`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Carrito vaciado!', '', 'success')
            contenedorCarritoProductos.classList.add("disabled")
            contenedorCarritoAcciones.classList.add("disabled")
            contenedorCarritoVacio.classList.remove("disabled")
            localStorage.clear()
        } else if (result.isDenied) {
          Swal.fire('El carrito sigue igual', '', 'info')
        }
      })

    
})

botonComprar.addEventListener("click",(e)=>{
    Swal.fire({
        title: '¿Desea comprar los productos en el carrito?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Finalizar compra',
        denyButtonText: `Seguir comprando`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Compra finalizada!', '', 'success')
            contenedorCarritoProductos.classList.add("disabled")
            contenedorCarritoAcciones.classList.add("disabled")
            contenedorCarritoComprado.classList.remove("disabled")
            localStorage.clear()
        } else if (result.isDenied) {
          Swal.fire('Seguirá comprando', '', 'info')
        }
      })
    
})

function sacarDelCarrito(idBoton){
    
    if(productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        
        
        
        if(productosEnCarrito[index].cantidad==1){
                productosEnCarrito.splice(index,1)
                localStorage.clear()
                localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
                console.log(productosEnCarrito)
        }else{
            productosEnCarrito[index].cantidad--;
            console.log(productosEnCarrito)
        }
    }
    
    agregarHTML()
    if (productosEnCarrito.length==0){
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoVacio.classList.remove("disabled")
        localStorage.clear()
    }

    actualizaTotal(total)
};


function actualizaTotal(total){
    productosEnCarrito.forEach(producto =>{
        total=total+producto.cantidad*producto.precio;
        textoTotal.innerText=`$${total}`
    })
}