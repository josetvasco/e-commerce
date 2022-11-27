const API_URL = 'http://localhost:3000/favoritos/';
const API_GENERAL = 'http://localhost:3000/favoritos/?q=';

const formBusqueda = document.getElementById('busqueda-form');
const sectionWihslist = document.getElementById('section-wishlist');
const cantidadFavoritos = document.getElementById('cambio-cantidad');

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
                            <h4>${nombre}</h4>
                        </div>
                        <p>${medida}</p>
                        <p>${categoria}</p>
                        <p>$${precio}</p>

                        <button class="button-agregar-carrito">Agregar carrito</button>
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

document.getElementById('img-heart').addEventListener('click', () => {
    location.href = '../favorites.html';
})

document.getElementById('logo').addEventListener('click', () => {
    location.href = '../index.html';
})