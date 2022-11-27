const API_URL = 'http://localhost:3000/carrito/';
const API_FAVORITO = 'http://localhost:3000/favoritos/';


const sectionCart = document.getElementById('subSection-cart');
const sectionCart2 = document.getElementById('section-cart');
const inputCantidad = document.getElementById('input-cantidad');
const restarButton = document.getElementById('restar-button');
const totalCOP = document.getElementById('total-COP');
const subtotalCOP = document.getElementById('subtotal');
const totalShipping = document.getElementById('total-shipping');
const cantidadFavoritos = document.getElementById('cambio-cantidad');
const cantidadCarrito = document.getElementById('cambio-cantidad-carrito');



const getCarrito = async (api) => {
    const peticion = await fetch(api)
    const data = await peticion.json();

    try {
        if (data.length > 0) {
            data.forEach(element => {

                const { id, cantidad, nombre, medida, imagen, precio, categoria } = element;

                const div = document.createElement('div');
                div.classList.add('card-cart');
                div.setAttribute('id', 'div-carrito-producto')
                div.setAttribute('data-id', id)


                div.innerHTML = `
                <div>
                    <img class="imagen-producto" src=${imagen}>
                </div>
                <div class="cart-description">
                    <p class="h-nombre"><strong>${nombre}</strong></p>
                    <p><strong>Sold By: </strong> <span class="span-categoria">${categoria}</span></p>
                    <p><strong>Quantity: </strong></p>
                    <p class="p-medida">${medida}</p>
                </div>
                <div class="cart-price">
                    <p>Price</p>
                    <p class="p-precio" id="precio">${precio}</p>
                </div>
                <div class="cart-quantity">
                    <p>Qty</p>
                    <div>
                        <button class="button-minus-cart">-</button>
                        <input id="input-cantidad" class="cantidad-cart" type="text" disabled value="${cantidad}">
                        <button class="button-plus-cart">+</button>
                    </div>

                </div>
                <div class="cart-total">
                    <p>Total</p>
                    <p id="total" class="clase-total">${precio * cantidad}</p>
                </div>
                <div class="actions-cart">
                    <p>Action</p>
                    <a class="action-cart-save" data-id=${id} id=${id} href="#">Save for later</a>
                    <a class="action-cart-remove" id=${id} href="#">Remove</a>
                </div>
                `
                sectionCart.appendChild(div)
            });
        }


    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carrito!',
        })
    }
}

getCarrito(API_URL);


sectionCart.addEventListener('click', (e) => {
    const btnMenos = e.target.classList.contains('button-minus-cart');
    const btnMas = e.target.classList.contains('button-plus-cart');

    const productoSeleccionado = e.target.parentElement.parentElement.parentElement;

    let cantidad = parseInt(productoSeleccionado.querySelector('.cantidad-cart').getAttribute('value'));
    let total = parseInt(productoSeleccionado.querySelector('#total').textContent);
    let precio = parseInt(productoSeleccionado.querySelector('#precio').textContent);

    if (btnMenos) {
        if (cantidad < 1) {
            btnMenos.setAttribute('disabled')
        }
        cantidad = cantidad - 1
        total = cantidad * precio
        productoSeleccionado.querySelector('#total').textContent = total;
        productoSeleccionado.querySelector('.cantidad-cart').setAttribute('value', cantidad);


    } else if (btnMas) {

        cantidad = cantidad + 1
        total = cantidad * precio
        productoSeleccionado.querySelector('#total').textContent = total;
        productoSeleccionado.querySelector('.cantidad-cart').setAttribute('value', cantidad);


    }
})

sectionCart2.addEventListener('click', (e) => {
    e.preventDefault()

    const btnListo = e.target.classList.contains('button-listo');
    if (btnListo) {
        const productoSeleccionado = e.target.parentElement.parentElement;

        const divProducto = productoSeleccionado.querySelectorAll('.card-cart')
        const divProductoArray = [...divProducto];


        let subtotalSum = 0;

        divProductoArray.forEach((e) => {
            let subtotal = parseInt(e.querySelector('.clase-total').textContent);

            subtotalSum = subtotalSum + subtotal;

        })
        subtotalCOP.textContent = subtotalSum
        totalCOP.textContent = subtotalSum + parseInt(totalShipping.textContent)
    }
})

sectionCart.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('action-cart-remove');

    if (btnEliminar) {
        const id = e.target.id;
        await fetch(API_URL + id, {
            method: 'DELETE'
        })
    }


})

sectionCart.addEventListener('click', async (e) => {
    const peticion2 = await fetch(API_FAVORITO);
    const data2 = await peticion2.json();

    const btnGuardar = e.target.classList.contains('action-cart-save');

    if (btnGuardar) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        const id = parseInt(productoSeleccionado.querySelector('a').getAttribute('data-id'))


        newProductoFavorito = {
            imagen: productoSeleccionado.querySelector('.imagen-producto').src,
            nombre: productoSeleccionado.querySelector('.h-nombre').textContent,
            medida: productoSeleccionado.querySelector('.p-medida').textContent,
            categoria: productoSeleccionado.querySelector('.span-categoria').textContent,
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

            const id = e.target.id;
            await fetch(API_URL + id, {
                method: 'DELETE'
            })

        } else {
            const id = e.target.id;
            await fetch(API_URL + id, {
                method: 'DELETE'
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

const cambioCarrito = async (api) => {
    const peticion4 = await fetch(api)
    const data4 = await peticion4.json();

    cantidadCarrito.textContent = data4.length
}

cambioCarrito(API_URL)

document.getElementById('img-heart').addEventListener('click', () => {
    location.href = '../favorites.html';
})

document.getElementById('logo').addEventListener('click', () => {
    location.href = '../index.html';
})

document.getElementById('img-carrito').addEventListener('click', () => {
    location.href = '../cart.html';
})
