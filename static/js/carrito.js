// ===== CARRITO COCONUT CAMERA + WHATSAPP =====

// Número de WhatsApp de Coconut Camera (con código de país Nicaragua: 505)
const WHATSAPP_NUMBER = '50589368295'; // ← Cambia este número

// Estado del carrito
let carrito = {
    productos: [],
    servicios: []
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    renderizarCarrito();
    actualizarContadorNavbar();
    attachBotonesAgregar();
});

// ===== GUARDAR Y CARGAR EN sessionStorage =====
function guardarCarrito() {
    sessionStorage.setItem('coconut_carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const data = sessionStorage.getItem('coconut_carrito');
    if (data) {
        carrito = JSON.parse(data);
    }
}

// ===== BOTONES "AGREGAR AL CARRITO" EN TARJETAS =====
function attachBotonesAgregar() {
    // Para cámaras (product-card)
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // No activar el flip de la card
            const nombre = btn.dataset.nombre;
            const precio = btn.dataset.precio;
            const tipo = btn.dataset.tipo || 'producto';
            agregarItem(nombre, precio, tipo);
        });
    });

    // Para servicios photobooth
    document.querySelectorAll('.btn-agregar-servicio').forEach(btn => {
        btn.addEventListener('click', () => {
            const nombre = btn.dataset.nombre;
            const precio = btn.dataset.precio;
            agregarItem(nombre, precio, 'servicio');
        });
    });
}

// ===== AGREGAR ITEM AL CARRITO =====
function agregarItem(nombre, precio, tipo) {
    const lista = tipo === 'servicio' ? carrito.servicios : carrito.productos;

    const existe = lista.some(item => item.nombre === nombre);
    if (existe) {
        mostrarAlerta(`"${nombre}" ya está en el carrito`, 'warning');
        return;
    }

    lista.push({ nombre, precio: parseFloat(precio) });
    guardarCarrito();
    actualizarContadorNavbar();
    mostrarAlerta(`✅ "${nombre}" agregado al carrito`, 'success');

    if (document.querySelector('#carrito-container')) {
        renderizarCarrito();
    }
}

// ===== ELIMINAR ITEM =====
function eliminarItem(nombre, tipo) {
    if (tipo === 'servicio') {
        carrito.servicios = carrito.servicios.filter(i => i.nombre !== nombre);
    } else {
        carrito.productos = carrito.productos.filter(i => i.nombre !== nombre);
    }
    guardarCarrito();
    actualizarContadorNavbar();
    renderizarCarrito();
}

// ===== VACIAR CARRITO =====
function vaciarCarrito() {
    carrito = { productos: [], servicios: [] };
    guardarCarrito();
    actualizarContadorNavbar();
    renderizarCarrito();
}

// ===== ACTUALIZAR CONTADOR EN NAVBAR =====
function actualizarContadorNavbar() {
    const total = carrito.productos.length + carrito.servicios.length;
    const contadores = document.querySelectorAll('.cart-count');
    contadores.forEach(el => {
        el.textContent = total;
        el.style.display = total > 0 ? 'inline-flex' : 'none';
    });
}

// ===== RENDERIZAR CARRITO (página carrito.html) =====
function renderizarCarrito() {
    const container = document.querySelector('#carrito-container');
    if (!container) return;

    const totalItems = carrito.productos.length + carrito.servicios.length;
    const layout = document.querySelector('.carrito-layout');

    if (totalItems === 0) {
        layout.classList.add('carrito-vacio-layout');

        container.innerHTML = `
            <div class="carrito-vacio">
                <div class="carrito-vacio-icon">🛒</div>
                <h2>Tu carrito está vacío</h2>
                <p>Agrega cámaras o servicios para comenzar</p>
                <div class="carrito-vacio-btns">
                    <a href="/camara" class="btn-ir">Ver Cámaras →</a>
                    <a href="/photoboot" class="btn-ir">Ver Photo Booth →</a>
                </div>
            </div>`;
        document.querySelector('#carrito-total-section').style.display = 'none';
        return;
    }

    layout.classList.remove('carrito-vacio-layout');
    let html = '';
    

    if (carrito.productos.length > 0) {
        html += `<div class="carrito-seccion">
            <h3 class="carrito-seccion-titulo">Cámaras</h3>
            <div class="carrito-items">`;
        carrito.productos.forEach(item => {
            html += crearItemHTML(item, 'producto');
        });
        html += `</div></div>`;
    }

    if (carrito.servicios.length > 0) {
        html += `<div class="carrito-seccion">
            <h3 class="carrito-seccion-titulo">Servicios Photo Booth</h3>
            <div class="carrito-items">`;
        carrito.servicios.forEach(item => {
            html += crearItemHTML(item, 'servicio');
        });
        html += `</div></div>`;
    }

    container.innerHTML = html;

    const totalPrecio = [...carrito.productos, ...carrito.servicios]
        .reduce((sum, item) => sum + item.precio, 0);

    const totalEl = document.querySelector('#carrito-total');
    if (totalEl) totalEl.textContent = `$${totalPrecio.toFixed(2)}`;

    const totalSection = document.querySelector('#carrito-total-section');
    if (totalSection) totalSection.style.display = 'block';
}

function crearItemHTML(item, tipo) {
    const precioTexto = item.precio > 0 ? `$${item.precio.toFixed(2)}` : 'Precio a consultar';
    return `
        <div class="carrito-item">
            <div class="carrito-item-info">
                <span class="carrito-item-nombre">${item.nombre}</span>
                <span class="carrito-item-precio">${precioTexto}</span>
            </div>
            <button class="carrito-item-eliminar" onclick="eliminarItem('${item.nombre}', '${tipo}')" title="Eliminar">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>`;
}

// ===== GENERAR MENSAJE WHATSAPP =====
function generarMensajeWhatsApp() {
    const tieneProductos = carrito.productos.length > 0;
    const tieneServicios = carrito.servicios.length > 0;

    let mensaje = 'Hola Coconut Camera.\n\n';

    if (tieneProductos && tieneServicios) {
        mensaje += 'Deseo información sobre:\n\n';
        mensaje += '📷 *CÁMARAS*\n';
        carrito.productos.forEach(p => {
            const precio = p.precio > 0 ? ` ($${p.precio.toFixed(2)})` : '';
            mensaje += `• ${p.nombre}${precio}\n`;
        });
        mensaje += '\n🎉 *SERVICIOS*\n';
        carrito.servicios.forEach(s => {
            mensaje += `• ${s.nombre}\n`;
        });
    } else if (tieneProductos) {
        mensaje += 'Estoy interesado en los siguientes productos:\n\n';
        carrito.productos.forEach(p => {
            const precio = p.precio > 0 ? ` ($${p.precio.toFixed(2)})` : '';
            mensaje += `• ${p.nombre}${precio}\n`;
        });
    } else if (tieneServicios) {
        mensaje += 'Estoy interesado en los siguientes servicios:\n\n';
        carrito.servicios.forEach(s => {
            mensaje += `• ${s.nombre}\n`;
        });
    }

    mensaje += '\n¿Podrían brindarme información sobre disponibilidad?\n\nGracias.';
    return mensaje;
}

// ===== ABRIR WHATSAPP =====
function finalizarPorWhatsApp() {
    const totalItems = carrito.productos.length + carrito.servicios.length;

    if (totalItems === 0) {
        mostrarAlerta('Tu carrito está vacío', 'warning');
        return;
    }

    const mensaje = generarMensajeWhatsApp();
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}

// ===== ALERTA =====
function mostrarAlerta(mensaje, tipo) {
    const alertaExistente = document.querySelector('.coconut-alerta');
    if (alertaExistente) alertaExistente.remove();

    const alerta = document.createElement('div');
    alerta.className = `coconut-alerta coconut-alerta-${tipo}`;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.add('fadeout');
        setTimeout(() => alerta.remove(), 400);
    }, 3000);
}