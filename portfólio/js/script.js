document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // 1. Menu de Navegação (Hamburger Menu)
    // --------------------------------------------------
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
            });
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

                // Abre o Gmail com os campos preenchidos
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=fabegalo@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Nome: ${name}\nEmail: ${email}\n\n${message}`
                )}`;

                window.open(gmailLink, '_blank');

                formMessage.textContent = 'Gmail aberto com a mensagem preenchida. Basta clicar em "Enviar".';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        });
    }

    // --------------------------------------------------
    // 3. Efeito Interativo 1: Rolagem Suave
    // --------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.main-header')?.offsetHeight || 0),
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------------
    // 4. Efeito Interativo 2: Revelar Elementos ao Rolar
    // --------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});
