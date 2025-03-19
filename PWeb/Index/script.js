// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const formularioValoracion = document.getElementById('valoracionForm');
    const contenedorValoraciones = document.querySelector('.valoraciones-container');
    const header = document.querySelector('.header-main');

    // Función para obtener iniciales
    function obtenerIniciales(nombre) {
        return nombre.split(' ')
            .map(palabra => palabra[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    // Función para formatear la fecha
    function formatearFecha(fecha) {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${fecha.getDate()} ${meses[fecha.getMonth()]}, ${fecha.getFullYear()}`;
    }

    // Manejar el envío del formulario
    if (formularioValoracion) {
        formularioValoracion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const comentario = document.getElementById('experiencia').value;

            const nuevaValoracion = document.createElement('div');
            nuevaValoracion.className = 'col-md-6 mb-4';
            
            nuevaValoracion.innerHTML = `
                <div class="card-container shadow-soft valoracion-card">
                    <div class="valoracion-header">
                        <div class="usuario-info">
                            <div class="avatar">${obtenerIniciales(nombre)}</div>
                            <div class="usuario-detalles">
                                <h3>${nombre}</h3>
                                <span class="fecha-valoracion">${formatearFecha(new Date())}</span>
                            </div>
                        </div>
                    </div>
                    <div class="valoracion-contenido">
                        <p class="comentario">"${comentario}"</p>
                    </div>
                    <div class="valoracion-footer">
                        <div class="verificacion">
                            <i class="fas fa-check-circle"></i>
                            <span>Cliente verificado</span>
                        </div>
                    </div>
                </div>
            `;

            contenedorValoraciones.insertBefore(nuevaValoracion, contenedorValoraciones.firstChild);
            
            alert('¡Gracias por tu valoración!');
            formularioValoracion.reset();

            nuevaValoracion.style.opacity = '0';
            nuevaValoracion.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                nuevaValoracion.style.transition = 'all 0.6s ease-out';
                nuevaValoracion.style.opacity = '1';
                nuevaValoracion.style.transform = 'translateY(0)';
                nuevaValoracion.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        });
    }

    // Efectos de sombra en elementos interactivos
    document.querySelectorAll('.shadow-soft').forEach(elemento => {
        elemento.addEventListener('mousedown', () => {
            elemento.style.transform = 'translateY(1px)';
            elemento.style.boxShadow = 'inset 2px 2px 5px rgba(184, 185, 190, 0.3), inset -3px -3px 7px rgba(255, 255, 255, 0.8)';
        });

        ['mouseup', 'mouseleave'].forEach(evento => {
            elemento.addEventListener(evento, () => {
                elemento.style.transform = '';
                elemento.style.boxShadow = '';
            });
        });
    });

    // Control de scroll del header
    let ultimoScroll = 0;
    
    window.addEventListener('scroll', () => {
        const scrollActual = window.pageYOffset;
        
        if (scrollActual > ultimoScroll && scrollActual > 50) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        ultimoScroll = scrollActual;
    });

    // Animaciones de entrada
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = '1';
                    entrada.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1, rootMargin: '20px' }
    );

    document.querySelectorAll('.card-container, .hero-section').forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'all 0.6s ease-out';
        observador.observe(elemento);
    });

    // Manejar el formulario de contacto
    const formularioContacto = document.getElementById('formularioContacto');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Aquí puedes agregar la lógica para enviar el formulario
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            formularioContacto.reset();
        });

        // Añadir efectos de focus a los inputs
        const inputs = formularioContacto.querySelectorAll('.input-destacado');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focus');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focus');
            });
        });
    }

    // Funcionalidad del menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && 
                !mainNav.contains(e.target) && 
                mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});