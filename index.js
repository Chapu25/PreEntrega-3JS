const productos = [
    {
        id: 1,
        nombre:"Fernet",
        imagen: "https://dcdn.mitiendanube.com/stores/003/075/996/products/fernet-e41e158d1e82a4de7417198456702230-640-0.png" ,
        precio: 10000
    },
    {
        id: 2,
        nombre:"Smirnoff",
        imagen: "https://acdn.mitiendanube.com/stores/001/476/675/products/smirnoff1-29d0b3a249d13ad3f616097124140992-640-0.jpg" ,
        precio: 5500
    },
    {
        id: 3,
        nombre:"Bombay",
        imagen: "https://acdn.mitiendanube.com/stores/001/756/126/products/bombay-gin1-2986569aee7555de5416261123458289-640-0.png" ,
        precio: 25000
    },
    {
        id: 4,
        nombre:"Gancia",
        imagen: "https://dcdn.mitiendanube.com/stores/002/150/004/products/aperitivo_gancia1-3846f1820f5d09930616547014324050-640-0.jpg" ,
        precio: 4400
    },
    {
        id: 5,
        nombre:"Absolut",
        imagen: "https://dcdn.mitiendanube.com/stores/001/213/476/products/vodka-absolut1-be5ef6dc06539ddd3b15909453807844-640-0.jpg" ,
        precio: 12000
    },
    {
        id: 6,
        nombre:"Sky",
        imagen: "https://carrefourar.vtexassets.com/arquivos/ids/187350/7791200200583_02.jpg?v=637468601046270000" ,
        precio: 5000
    },
]


const container = document.getElementById("container");

const comprasCarrito = document.getElementById("comprasCarrito");

const contenedorBotones = document.getElementById("contenedorBotones")




let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function agregarAlCarrito(producto) {
    const { id } = producto;

    if (carrito.some(el => el.id === id)) {
        const indexProducto = carrito.findIndex(el => el.id === id);
        carrito[indexProducto].cantidad += 1;
        carrito[indexProducto].subtotal = carrito[indexProducto].cantidad * carrito[indexProducto].precio;
    } else {
        const nuevoProducto = {
            ...producto,
            cantidad: 1,
            subtotal: producto.precio,
        };
        carrito.push(nuevoProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function crearCarta(producto) {
    const carta = document.createElement("div");
    carta.className = "carta";

    const nombreProducto = document.createElement("h1");
    nombreProducto.innerText = producto.nombre;

    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.className = "img";

    const precioProducto = document.createElement("p");
    precioProducto.innerText = `$${producto.precio}`;

    const boton = document.createElement('button');
    boton.innerText = "Comprar";
    boton.className = "btn";
    boton.addEventListener("click", () => agregarAlCarrito(producto) );

    carta.append(nombreProducto, imagenProducto, precioProducto, boton);
    container.append(carta);
}
productos.forEach(el => {
    crearCarta(el);
});








const mostrar = document.createElement("button");
mostrar.innerText = "Mirar tu carrito";
mostrar.className = "btn-2"

mostrar.addEventListener("click", () => {
    
    comprasCarrito.innerHTML = "";

    if (carrito.length === 0) {
        comprasCarrito.innerText = "Tu carrito está vacío.";
    } else {
        
        carrito.forEach(producto => {
            const productoCarrito = document.createElement("div");
            

            const imagenCarrito = document.createElement("img");
            imagenCarrito.src = producto.imagen;
            

            const nombreCarrito = document.createElement("h2");
            nombreCarrito.innerText = producto.nombre;


            const precioCarrito = document.createElement("p");
            precioCarrito.innerText = `Precio: $${producto.precio}`;


            const cantidadCarrito = document.createElement("p");
            cantidadCarrito.innerText = `Cantidad: ${producto.cantidad}`;

            
            const subtotalCarrito = document.createElement("p");
            subtotalCarrito.innerText = `Subtotal: $${producto.subtotal}`;

            
            productoCarrito.append(imagenCarrito, nombreCarrito, precioCarrito, cantidadCarrito, subtotalCarrito);
            comprasCarrito.append(productoCarrito);
        });
    }
});


contenedorBotones.append(mostrar);






const limpiar = document.createElement("button");
limpiar.innerText = "Limpiar tu carrito";
limpiar.className = "btn-2"

limpiar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    comprasCarrito.innerHTML = "Tu carrito ha sido limpiado.";
});

contenedorBotones.append(limpiar);
