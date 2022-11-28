const API_URL = 'http://localhost:3000/ordenes';

const divCliente = document.getElementById('datos-ventas')

const getOrdenes = async (api) => {
    const peticion = await fetch(api)
    const data = await peticion.json();

    try {
        if (data.length > 0) {
            data.forEach(element => {

                const { direccion, id, nombre, telefono, totalAPagar, productosComprados } = element

                const div = document.createElement('div')
                div.setAttribute('id', 'datos-cliente')

                div.innerHTML = `
                <div id="detalle-cliente">
                    <div>
                        <p>Nombre:</p>
                        <p>${nombre}</p>
                    </div>
                    <div>
                        <p>Direccion:</p>
                        <p>${direccion}</p>
                    </div>
                    <div>
                        <p>Telefono:</p>
                        <p>${telefono}</p>
                    </div>
                    <div>
                        <p>Total A Pagar:</p>
                        <p>${totalAPagar}</p>
                    </div>
                </div>
                `
                divCliente.appendChild(div)

                productosComprados.forEach((e) => {

                    const { imagen, nombre, medida, cantidad, categoria, id, precio, precioTotal } = e

                    const div2 = document.createElement('div')
                    div2.setAttribute('id', 'datos-productos')

                    div2.innerHTML = `
                    <div class="detalle-producto">
                        <p>${nombre}</p>
                        <p>${medida}</p>
                        <p>${categoria}</p>
                        <p>${cantidad}</p>
                        <p>${precio}</p>
                        <p>${precioTotal}</p>
                    </div>
                    `
                    divCliente.appendChild(div2)

                })
            });
        }
    } catch {

    }
}

getOrdenes(API_URL)