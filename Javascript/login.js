const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const back = document.querySelector('.back');

// Seleciona os formulários
const loginForm = wrapper.querySelector('.form-box.login form');
const registerForm = wrapper.querySelector('.form-box.register form');

// Limpa os campos e reseta os labels
function resetForm(form) {
    form.reset(); // Limpa os valores
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        // Dispara um evento 'input' para forçar o CSS a atualizar os labels
        input.dispatchEvent(new Event('input'));
    });
}

// Ao clicar em "Cadastre-se aqui" (ativa o formulário de cadastro)
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
    resetForm(loginForm); // Limpa o formulário de login
});

// Ao clicar em "Entra" (volta para o login)
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    resetForm(registerForm); // Limpa o formulário de cadastro
});

// Ao clicar no botão "Voltar" (seta)
back.addEventListener('click', () => {
    wrapper.classList.remove('active');
    resetForm(registerForm); // Limpa o formulário de cadastro
});

// Substitua o evento atual por este:
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const input = icon.closest('.input-box').querySelector('input');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.textContent = 'visibility_off';
        } else {
            input.type = 'password';
            icon.textContent = 'visibility';
        }
    });
});


