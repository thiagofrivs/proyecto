//TRAIGO LOS PRODUCTOS
let productos=''
fetch('./productos/productos.json')
.then((res)=>res.json())
.then((data)=>
{
    productos=data
    console.log(productos)
    
})





let productosEnCarrito= JSON.parse(localStorage.getItem("productos-en-carrito"))
const contenedorCarritoVacio=document.querySelector("#carrito-vacio")
const contenedorCarritoProductos=document.querySelector("#carrito-productos")
const contenedorCarritoAcciones=document.querySelector("#carrito-acciones")
const contenedorCarritoComprado=document.querySelector("#carrito-comprado")
const textoTotal=document.querySelector("#total")
const botonVaciar=document.querySelector("#vaciar-carrito")
const botonComprar=document.querySelector("#boton-comprar")
let total=0

console.log(productosEnCarrito)


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
                sacarDelCarrito(boton,1)
                Toastify({
                    text: "Producto eliminado!",
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

function sacarDelCarrito(idBoton,cant){
    
    if(productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        
        
        
        if(productosEnCarrito[index].cantidad==1 || productosEnCarrito[index].cantidad == cant){
                productosEnCarrito.splice(index,1)
                localStorage.clear()
                localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
                console.log(productosEnCarrito)
                
        }else{
            productosEnCarrito[index].cantidad=productosEnCarrito[index].cantidad-cant;
            localStorage.clear()
            localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
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