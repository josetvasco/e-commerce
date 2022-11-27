const API_URL = 'http://localhost:3000/productos/';
const API_CATEGORIA = 'http://localhost:3000/productos/?categoria=';
const API_GENERAL = 'http://localhost:3000/productos/?q=';
const API_FAVORITO = 'http://localhost:3000/favoritos/';
const API_CARRITO = 'http://localhost:3000/carrito/';


const divProductos = document.getElementById('seccion-productos');
const formBusqueda = document.getElementById('busqueda-form');
const cantidadFavoritos = document.getElementById('cambio-cantidad');
const pFiltros = document.getElementsByClassName('p-filtros');
const pFiltrosArray = [...pFiltros];


const getProducto = async (api) => {
    const peticion = await fetch(api);
    const data = await peticion.json();

    try {
        if (data.length > 0) {
            
            divProductos.innerHTML = ``
            data.forEach((e) => {
                const { id, nombre, medida, precio, imagen, categoria } = e;
                const div = document.createElement('div');
                div.classList.add('card');

                div.innerHTML = `
                <div data-id=${id}>
                    <img class="imagen-producto" src=${imagen} >
                </div>
                <div class="card-description">
                    <div class="titulo">
                        <h4 class="h-nombre">${nombre}</h4>
                        <img src="./assets/favorito.png" alt="favorito" class="btn-favoritos">
                    </div>
                    <p class="p-medida">${medida}</p>
                    <p class="p-categoria">${categoria}</p>
                    <p class="p-precio">${precio}</p>

                    <button class="button-agregar-carrito">Agregar carrito</button>
                `
                divProductos.appendChild(div);

            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Producto no existe!',
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Producto no existe!',
        })
    }
}

getProducto(API_URL);

pFiltrosArray.forEach((e) => {
    e.addEventListener('click', (element) => {
        const filtro = element.target.textContent.toUpperCase()

        if (filtro === 'CATEGORIAS') {
            getProducto(API_URL)
        } else {
            getProducto(API_CATEGORIA + filtro)
        }

    })
})

formBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputBusqueda = document.getElementById('input-busqueda').value.toUpperCase();

    if (inputBusqueda && inputBusqueda !== '') {
        getProducto(API_GENERAL + inputBusqueda)
        inputBusqueda.value = ''
    } else {
        window.location.reload()
    }
})


divProductos.addEventListener('click', async (e) => {
    e.preventDefault();

    const peticion2 = await fetch(API_FAVORITO);
    const data2 = await peticion2.json();

    const btnFavoritos = e.target.classList.contains('btn-favoritos');

    if (btnFavoritos) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        const id = parseInt(productoSeleccionado.querySelector('div').getAttribute('data-id')),

            newProductoFavorito = {
                imagen: productoSeleccionado.querySelector('.imagen-producto').src,
                nombre: productoSeleccionado.querySelector('.h-nombre').textContent,
                medida: productoSeleccionado.querySelector('.p-medida').textContent,
                categoria: productoSeleccionado.querySelector('.p-categoria').textContent,
                precio: parseInt(productoSeleccionado.querySelector('.p-precio').textContent),
                id: parseInt(id)
            }

        const productoVerficado = data2.find((element) => {
            return id === element.id
        })


        if (productoVerficado == undefined) {
            Swal.fire(
                'Agregado!',
                'El producto fue agregado a Favorito!',
                'success'
            )

            fetch(API_FAVORITO, {
                method: 'POST',
                body: JSON.stringify(newProductoFavorito),
                headers: {
                    "Content-type": "application/json"
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto ya existe en Favoritos!',
            })
        }
    }
})


const cambioFavorito = async (api) => {
    const peticion3 = await fetch(api)
    const data3 = await peticion3.json();

    cantidadFavoritos.textContent = data3.length
}

cambioFavorito(API_FAVORITO)

divProductos.addEventListener('click', async (e) => {
    e.preventDefault();

    const peticion4 = await fetch(API_CARRITO);
    const data4 = await peticion4.json();

    const btnCarrito = e.target.classList.contains('button-agregar-carrito');

    if (btnCarrito) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        const id = parseInt(productoSeleccionado.querySelector('div').getAttribute('data-id'))

        const productoVerficado = data4.find((element) => {
            return id === element.id
        })


        if (productoVerficado == undefined) {

            newProductoCarrito = {
                imagen: productoSeleccionado.querySelector('.imagen-producto').src,
                nombre: productoSeleccionado.querySelector('.h-nombre').textContent,
                medida: productoSeleccionado.querySelector('.p-medida').textContent,
                categoria: productoSeleccionado.querySelector('.p-categoria').textContent,
                precio: parseInt(productoSeleccionado.querySelector('.p-precio').textContent),
                id: id,
                cantidad: 1
            }

            Swal.fire(
                'Agregado!',
                'El producto fue agregado al Carrito!',
                'success'
            )

            await fetch(API_CARRITO, {
                method: 'POST',
                body: JSON.stringify(newProductoCarrito),
                headers: {
                    "Content-type": "application/json"
                }
            })
        } else {
          data4.forEach( async (e) => {

            const cantidadNueva = e.cantidad += 1;

            const productoModificado = {
                imagen: productoSeleccionado.querySelector('.imagen-producto').src,
                nombre: productoSeleccionado.querySelector('.h-nombre').textContent,
                medida: productoSeleccionado.querySelector('.p-medida').textContent,
                categoria: productoSeleccionado.querySelector('.p-categoria').textContent,
                precio: parseInt(productoSeleccionado.querySelector('.p-precio').textContent),
                id: id,
                cantidad: cantidadNueva
            }
        
            await fetch(API_CARRITO + id, {
                method: 'PUT',
                body: JSON.stringify(productoModificado),
                headers: {
                    "Content-type": "application/json"
                }
            })
          })
          Swal.fire(
            'Agregado!',
            'El producto fue agregado al Carrito!',
            'success'
        )
        }
    }
})

document.getElementById('img-heart').addEventListener('click', () => {
    location.href = '../favorites.html';
})

document.getElementById('logo').addEventListener('click', () => {
    location.href = '../index.html';
})

document.getElementById('img-carrito').addEventListener('click', () => {
    location.href = '../cart.html';
})