// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // CORREÇÃO FINAL: Este script SÓ ATUA se encontrar um formulário com ID #form-login.
    // Ele IGNORA qualquer outro formulário na página (incluindo o de contacto).
    // -------------------------------------------------------------------------
    const loginForm = document.getElementById('form-login'); 

    if(loginForm) {
        console.log("LOGIN FORMULÁRIO DETETADO! (ID #form-login)");
        
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Lógica de Login Aqui (para simulação)
            const email = loginForm.querySelector('input[name="email"]')?.value;
            const password = loginForm.querySelector('input[name="password"]')?.value;

            if (!email || !password) {
                // Se o formulário de login real estiver vazio, mostramos o alerta.
                alert("Por favor, preencha todos os campos do LOGIN."); 
                return;
            }

            alert("Login em modo simulação. Redirecionando para o dashboard...");
            window.location.href = "dashboard.html";
        });
    } else {
        // Mensagem de sucesso (para a Landing Page)
        console.log("login.js carregado com sucesso. Nenhum formulário de login específico encontrado (OK).");
    }
});

