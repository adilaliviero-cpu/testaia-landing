// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    // CORREÇÃO: Este script SÓ ATUA se houver um formulário com o ID 'form-login'
    const loginForm = document.getElementById('form-login'); 

    if(loginForm) {
        console.log("LOGIN FORMULÁRIO DETETADO! (ID Correto)");
        
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Lógica de Login: O sistema só executa aqui se o ID for #form-login
            const email = loginForm.querySelector('input[name="email"]')?.value;
            const password = loginForm.querySelector('input[name="password"]')?.value;

            if (!email || !password) {
                alert("Por favor, preencha todos os campos do LOGIN.");
                return;
            }

            alert("Login em modo simulação. Redirecionando para o dashboard...");
            window.location.href = "dashboard.html";
        });
    } else {
        // Se este ficheiro for carregado na Landing Page (index.html), ele não faz nada.
        console.log("login.js carregado com sucesso. NENHUM formulário de login encontrado (OK).");
    }
});

