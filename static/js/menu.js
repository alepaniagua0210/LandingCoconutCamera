// ===== MENÚ HAMBURGUESA Y DROPDOWN - VERSIÓN MEJORADA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Menu.js cargado correctamente');
    
    // ===== HAMBURGUESA (PRIORIDAD ALTA) =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navSearchFrame = document.querySelector('.nav-search-frame');
    
    console.log('🔍 Menu toggle:', menuToggle);
    console.log('🔍 Nav frame:', navSearchFrame);
    
    if (menuToggle && navSearchFrame) {
        // Remover eventos previos
        menuToggle.replaceWith(menuToggle.cloneNode(true));
        const newToggle = document.querySelector('.menu-toggle');
        
        newToggle.addEventListener('click', function(e) {
            console.log('🍔 Hamburguesa CLICK!');
            e.stopPropagation();
            
            navSearchFrame.classList.toggle('active');
            newToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        console.log('✅ Hamburguesa configurada');
    } else {
        console.error('❌ ERROR: No se encontraron elementos hamburguesa');
    }
    
    // ===== DROPDOWN =====
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdown = document.querySelector('.dropdown');
    
    console.log('🔍 Dropdown toggle:', dropdownToggle);
    console.log('🔍 Dropdown menu:', dropdownMenu);
    
    if (dropdownToggle && dropdownMenu && dropdown) {
        // Remover eventos previos
        const newDropdownToggle = dropdownToggle.cloneNode(true);
        dropdownToggle.parentNode.replaceChild(newDropdownToggle, dropdownToggle);
        
        newDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            console.log('📂 Dropdown toggled');
        });
        
        // Cerrar al click fuera
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        console.log('✅ Dropdown configurado');
    } else {
        console.log('⚠️ No se encontraron elementos dropdown');
    }
});