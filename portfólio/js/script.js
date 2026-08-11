document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // 1. Menu de Navegação (Hamburger Menu)
    // --------------------------------------------------
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        const setMenu = (open) => {
            navList.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-times', open);
            icon.classList.toggle('fa-bars', !open);
        };

        hamburger.addEventListener('click', () => {
            setMenu(!navList.classList.contains('active'));
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                setMenu(false);
                hamburger.focus();
            }
        });
    }

    // --------------------------------------------------
    // 2. Formulário de Contato
    // --------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');

            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'O nome é obrigatório.';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'O e-mail é obrigatório.';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = 'Por favor, insira um e-mail válido.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            const subjectInput = document.getElementById('subject');
            const subjectError = document.getElementById('subjectError');
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'O assunto é obrigatório.';
                isValid = false;
            } else {
                subjectError.textContent = '';
            }

            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'A mensagem é obrigatória.';
                isValid = false;
            } else {
                messageError.textContent = '';
            }

            if (isValid) {
                const name = nameInput.value;
                const email = emailInput.value;
                const subject = subjectInput.value;
                const message = messageInput.value;

                const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
                const su = encodeURIComponent(subject);

                // Abre o Gmail com os campos preenchidos; se o pop-up for bloqueado,
                // cai para o cliente de e-mail padrão via mailto:
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=fabegalo@gmail.com&su=${su}&body=${body}`;
                const popup = window.open(gmailLink, '_blank', 'noopener');

                if (popup) {
                    formMessage.textContent = 'Gmail aberto com a mensagem preenchida. Basta clicar em "Enviar".';
                } else {
                    window.location.href = `mailto:fabegalo@gmail.com?subject=${su}&body=${body}`;
                    formMessage.textContent = 'Abrindo seu cliente de e-mail com a mensagem preenchida.';
                }

                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';

                const firstError = contactForm.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    const field = firstError.parentElement.querySelector('input, textarea');
                    if (field) field.focus();
                }
            }
        });
    }

    // --------------------------------------------------
    // 3. Efeito Interativo 1: Rolagem Suave
    // --------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.getElementById(targetId.slice(1));
            if (!targetElement) return;

            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - (document.querySelector('.main-header')?.offsetHeight || 0),
                behavior: 'smooth'
            });
        });
    });

    // --------------------------------------------------
    // 4. Efeito Interativo 2: Revelar Elementos ao Rolar
    // --------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealAll = () => revealElements.forEach(el => el.classList.add('active'));

    if (!('IntersectionObserver' in window)) {
        // Sem suporte ao observer, o conteúdo aparece direto.
        revealAll();
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });

        // Rede de segurança: as seções começam com opacity: 0, então se nada
        // for revelado a página inteira fica invisível. Se depois de 1s
        // continuar tudo escondido, mostra o conteúdo sem animação.
        setTimeout(() => {
            const revelados = document.querySelectorAll('.reveal-on-scroll.active').length;
            if (revelados === 0) revealAll();
        }, 1000);
    }

    // --------------------------------------------------
    // 5. Ano do rodapé
    // --------------------------------------------------
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
