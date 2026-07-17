// ===== CARRUSEL EN DIAGONAL CON BLUR SUAVE =====
    const carouselItems = document.querySelectorAll('.carousel-item-diagonal');
    const totalItems = carouselItems.length;
    let currentCenter = 0;

    function updateCarouselDiagonal() {
        carouselItems.forEach((item, index) => {
            let position = index - currentCenter;
            
            // Normalizar posición para el efecto circular
            if (position > totalItems / 2) {
                position = position - totalItems;
            }
            if (position < -totalItems / 2) {
                position = position + totalItems;
            }
            
            item.setAttribute('data-position', position);
        });
    }

    function nextSlide() {
        currentCenter = (currentCenter + 1) % totalItems;
        updateCarouselDiagonal();
    }

    function prevSlide() {
        currentCenter = (currentCenter - 1 + totalItems) % totalItems;
        updateCarouselDiagonal();
    }

    // Event listeners
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);

    // Auto-play cada 4 segundos
    let autoPlay = setInterval(nextSlide, 4000);

    // Pausar auto-play al interactuar con los botones
    const buttons = document.querySelectorAll('.carousel-nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, 4000);
        });
    });

    // Inicializar
    updateCarouselDiagonal();

   // ===== PANEL DESPLEGABLE LATERAL - CÁMARAS RECOMENDADAS =====
// Usar datos desde variables globales (definidas en el HTML)
const camarasRecomendadas = window.camarasRecomendadas || [];

const btnRecomendadas = document.getElementById('btnRecomendadas');
const panelLateral = document.getElementById('panelLateral');
const panelOverlay = document.getElementById('panelOverlay');
const panelClose = document.getElementById('panelClose');
const panelCards = document.getElementById('panelCards');

function renderCamaras() {
    if (!panelCards) return;
    
    panelCards.innerHTML = '';
    
    camarasRecomendadas.forEach(camara => {
        const item = document.createElement('a');
        item.href = window.camaraUrl || '/camara';
        item.className = 'panel-item';
        
        const imgDiv = document.createElement('div');
        imgDiv.className = 'panel-item-img';
        
        const img = document.createElement('img');
        img.src = camara.imagen;
        img.alt = camara.nombre;
        img.loading = 'lazy';
        
        img.onerror = function() {
            this.style.display = 'none';
            this.parentElement.textContent = '📷';
            this.parentElement.style.fontSize = '2.5rem';
        };
        
        imgDiv.appendChild(img);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'panel-item-info';
        
        const nombre = document.createElement('h4');
        nombre.textContent = camara.nombre;
        
        const desc = document.createElement('p');
        desc.textContent = camara.descripcion;
        
        const precio = document.createElement('span');
        precio.className = 'panel-price';
        precio.textContent = camara.precio;
        
        infoDiv.appendChild(nombre);
        infoDiv.appendChild(desc);
        infoDiv.appendChild(precio);
        
        item.appendChild(imgDiv);
        item.appendChild(infoDiv);
        
        panelCards.appendChild(item);
    });
}

function abrirPanel() {
    if (panelLateral) panelLateral.classList.add('active');
    if (panelOverlay) panelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarPanel() {
    if (panelLateral) panelLateral.classList.remove('active');
    if (panelOverlay) panelOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (btnRecomendadas) {
    btnRecomendadas.addEventListener('click', abrirPanel);
}

if (panelClose) {
    panelClose.addEventListener('click', cerrarPanel);
}

if (panelOverlay) {
    panelOverlay.addEventListener('click', cerrarPanel);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panelLateral && panelLateral.classList.contains('active')) {
        cerrarPanel();
    }
});

renderCamaras();