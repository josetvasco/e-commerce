const API_URL = 'http://localhost:3000/favoritos/';
const API_GENERAL = 'http://localhost:3000/favoritos/?q=';
const API_CARRITO = 'http://localhost:3000/carrito/';

const formBusqueda = document.getElementById('busqueda-form');
const sectionWihslist = document.getElementById('section-wishlist');
const cantidadFavoritos = document.getElementById('cambio-cantidad');
const cantidadCarrito = document.getElementById('cambio-cantidad-carrito');

const getFavoritos = async (api) => {
    const peticion = await fetch(api);
    const data = await peticion.json();
   
    try {
        if ( data.length > 0 ) {
            
            sectionWihslist.innerHTML = ``;
            data.forEach( (element) => {
               
                const { id, nombre, categoria, medida, imagen, precio } = element;

                const div = document.createElement('div');
                div.classList.add('card', 'card-favorito');

                div.innerHTML = `
                    <div>
                        <img class="imagen-producto" src=${imagen}>
                    </div>
                    <div class="card-description">
                        <div class="titulo">
                            <h4 class="h-nombre">${nombre}</h4>
                        </div>
                        <p class="p-medida" >${medida}</p>
                        <p class="p-categoria" >${categoria}</p>
                        <p class="p-precio" >$${precio}</p>

                        <button data-id=${id} class="button-agregar-carrito">Agregar carrito</button>
                        <button id=${id} class="button-eliminar-favorito">Eliminar favorito</button>
                    </div>
                `

                sectionWihslist.appendChild(div)
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Producto no está agregado a favoritos!',
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Producto no está agregado a favoritos!',
        })
    }
}

getFavoritos(API_URL)

const cambioFavorito = async (api) => {
    const peticion2 = await fetch(api)
    const data2= await peticion2.json();

    cantidadFavoritos.textContent = data2.length
}

cambioFavorito(API_URL)

const cambioCarrito = async (api) => {
    const peticion4 = await fetch(api)
    const data4 = await peticion4.json();

    cantidadCarrito.textContent = data4.length
}

cambioCarrito(API_CARRITO)

sectionWihslist.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('button-eliminar-favorito');

    if (btnEliminar) {
        const id = e.target.id;
        await fetch(API_URL + id, {
            method: 'DELETE'
        })
    }
})


formBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputBusqueda = document.getElementById('input-busqueda').value.toUpperCase();
    
    if (inputBusqueda && inputBusqueda !== '') {
        getFavoritos(API_GENERAL + inputBusqueda)
        inputBusqueda.value = ''
    } else {
        window.location.reload()
    }
})

//AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
sectionWihslist.addEventListener('click', async (e) => {
    e.preventDefault();

    const peticion3 = await fetch(API_CARRITO);
    const data3 = await peticion3.json();

    const btnCarrito = e.target.classList.contains('button-agregar-carrito');

    if (btnCarrito) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        const id = parseInt(productoSeleccionado.querySelector('button').getAttribute('data-id'))

        const productoVerficado = data3.find((element) => {
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
          data3.forEach( async (e) => {

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