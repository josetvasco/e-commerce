const API_URL = 'http://localhost:3000/ordenes';

const divCliente = document.getElementById('datos-cliente')
const divProducto = document.getElementById('datos-productos')


const getOrdenes = async (api) => {
    const peticion = await fetch(api)
    const data = await peticion.json();

    try {
        if (data.length > 0) {
            data.forEach(element => {

                const { direccion, id, nombre, telefono, totalAPagar, productosComprados } = element

                const div = document.createElement('div')
                div.classList.add('detalle-cliente')

                div.innerHTML = `
                <p>${nombre}</p>
                <p>${direccion}</p>
                <p>${telefono}</p>
                <p>${totalAPagar}</p>
                <p>Productos comprados:</p>
                `
                divCliente.appendChild(div)

                productosComprados.forEach((e) => {

                    const { imagen, nombre, medida, cantidad, categoria, id, precio, precioTotal } = e

                    const div2 = document.createElement('div')
                    div2.classList.add('detalle-prodcuto')

                    div2.innerHTML = `
                        <p>${imagen}</p>
                        <p>${nombre}</p>
                        <p>${medida}</p>
                        <p>${categoria}</p>
                        <p>${cantidad}</p>
                        <p>${precio}</p>
                        <p>${precioTotal}</p>
                    `
                    divProducto.appendChild(div2)

                })
            });
        }
    } catch {

    }
}

getOrdenes(API_URL)