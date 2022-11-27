const API_URL = 'http://localhost:3000/productos/';
const API_FILTRAR = 'http://localhost:3000/productos/?id=';


const divProductos = document.getElementById('div-productos');
const formProducto = document.getElementById('form-producto');
const btnModificar = document.getElementById('btn-modificar');
const formFiltrar = document.getElementById('filtrar-producto');

const getProductos = async (api) => {
    const peticion = await fetch(api);
    const data = await peticion.json();

    try {
        if (data.length > 0) {
            divProductos.innerHTML = ``
            data.forEach(element => {
    
                const { id, nombre, categoria, medida, precio, imagen } = element;
    
                const div = document.createElement('div');
                div.classList.add('card');
    
                div.innerHTML = `
                    <div class="producto">
                        <img class="producto-imagen" src="${imagen}" alt="">
                        <div class="producto-detalle">
                            <p class="p-id">${id}</p>
                            <p class="p-nombre">${nombre}</p>
                            <p class="p-categoria">${categoria}</p>
                            <p class="p-medida">${medida}</p>
                            <p>$</p><p class="p-precio">${precio}</p>
                            <button id=${id} class="btn-borrar">BORRAR</button>
                            <button id=${id} class="btn-editar">EDITAR</button>
                        </div>
                    </div>
                        `
                divProductos.appendChild(div);
            });
        } else {
            alert('Productos no encontrados')
        }
        
       
    } catch (error) {
        console.log(error);
    }
}

getProductos(API_URL);

divProductos.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-borrar');

    if (btnEliminar) {
        const id = e.target.id;
        await fetch(API_URL + id, {
            method: 'DELETE'
        })
    }
})

divProductos.addEventListener('click', async (e) => {
    const btnEditar = e.target.classList.contains('btn-editar');

    if (btnEditar) {
        const productoSeleccionado = e.target.parentElement.parentElement;

        console.log(productoSeleccionado)

        document.getElementById('imagen').value = productoSeleccionado.querySelector('img').src
        document.getElementById('nombre').value = productoSeleccionado.querySelector('.p-nombre').textContent
        document.getElementById('categoria').value = productoSeleccionado.querySelector('.p-categoria').textContent
        document.getElementById('medida').value = productoSeleccionado.querySelector('.p-medida').textContent
        document.getElementById('precio').value = productoSeleccionado.querySelector('.p-precio').textContent
        document.getElementById('id').value = productoSeleccionado.querySelector('.p-id').textContent
    }
})

formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProducto = {
        nombre: e.target.nombre.value.toUpperCase(),
        categoria: e.target.categoria.value.toUpperCase(),
        medida: e.target.medida.value.toUpperCase(),
        precio: parseInt(e.target.precio.value),
        imagen: e.target.imagen.value
    }

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newProducto),
        headers: {
            "Content-type": "application/json"
        }
    })

    e.target.nombre.value = ""
    e.target.categoria.value = ""
    e.target.medida.value = ""
    e.target.precio.value = ""
    e.target.imagen.value = ""
})

btnModificar.addEventListener('click', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value.toUpperCase();
    const nombre = document.getElementById('nombre').value.toUpperCase();
    const categoria = document.getElementById('categoria').value.toUpperCase();
    const medida = document.getElementById('medida').value.toUpperCase();
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const productoModificado = {
        id: id,
        nombre: nombre,
        categoria: categoria,
        medida: medida,
        precio: parseInt(precio),
        imagen: imagen
    }

    await fetch(API_URL + id, {
        method: 'PUT',
        body: JSON.stringify(productoModificado),
        headers: {
            "Content-type": "application/json"
        }
    })
})


formFiltrar.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputFiltrar = document.getElementById('input-buscar').value.toUpperCase();

    if (inputFiltrar && inputFiltrar !== '') {
        getProductos(API_FILTRAR + inputFiltrar);
        inputFiltrar.value = '';
    } else {
        window.location.reload();
    }

})

// formPrincipal.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const type = selectType.value;
//     const status = selectStatus.value;
//     const search = (txtSearch.value).toUpperCase();

//     if (type && type !== '') {
//         getInmuebles(apiType + type);
//         type.value = '';
//     } else if (status && status !== '') {
//         getInmuebles(apiStatus + status);
//         status.value = '';
//     } else if (search && search !== '') {
//         getInmuebles(apiSearch + search);
//         search.value = '';
//     } else {
//         window.location.reload();
//     }
// })