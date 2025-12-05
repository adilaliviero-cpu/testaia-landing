// js/register.js

document.addEventListener('DOMContentLoaded', () => {
    // CORREÇÃO: Este script SÓ ATUA se houver um formulário com o ID 'form-register'
    const registerForm = document.getElementById('form-register'); 

    if (registerForm) {
        console.log("REGISTO FORMULÁRIO DETETADO! (ID Correto)");

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Lógica de Registo Aqui
            alert("Registo em modo simulação. Conta criada! Redirecionando para login...");
        });
    } else {
        // Se este ficheiro for carregado na Landing Page (index.html), ele não faz nada.
        console.log("register.js carregado com sucesso. NENHUM formulário de registo encontrado (OK).");
    }
});

