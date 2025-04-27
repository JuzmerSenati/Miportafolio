// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // ===== MENÚ HAMBURGUESA (Responsive) =====
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('fa-times'); // Cambia el icono a "X"
    });

    // Cerrar el menú al hacer clic en un enlace (útil en móviles)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('fa-times');
        });
    });

    // ===== SCROLL SUAVE PARA ENLACES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                behavior: 'smooth'
            });
        });
    });

    // ===== CAMBIAR ESTILO DEL HEADER AL HACER SCROLL =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--white)';
            header.style.boxShadow = 'none';
        }
    });

    // ===== ANIMACIONES AL HACER SCROLL (Intersection Observer) =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .about-content, .skill-category, .project-card, .contact-info, .contact-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    animateOnScroll();

    // ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            // Simular envío (en un proyecto real, usarías Fetch API o AJAX)
            alert(`¡Gracias, ${name}! Tu mensaje ha sido enviado.`);
            this.reset();
        });
    }

    // ===== EFECTO DE MÁQUINA DE ESCRIBIR EN EL HERO (Opcional) =====
    const typewriter = function() {
        const title = document.querySelector('.hero-content h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            let i = 0;
            
            const typing = setInterval(() => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        }
    };

    // Descomenta la siguiente línea si quieres activar el efecto:
    // typewriter();
});