// js/login.js
// Liga o Login ao Supabase (MODO REAL)

// =========================================================================
// ATENÇÃO: SUBSTITUA ESTAS DUAS LINHAS PELAS SUAS CHAVES REAIS DO SUPABASE
// =========================================================================
const SUPABASE_URL = "https://nlgxfeemybrizoydzhw.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ3hmZWVteWJyaXpveWR6aHciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMTc0NDczMSwiZXhwIjoxODU5NDExMTMxfQ.CzFuYS6XKvEwW5OsAAPAcHvuo-NVE4PUwDSKgqK9Yas"; 
// =========================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-login'); 

    if(loginForm) {
        console.log("LOGIN FORMULÁRIO DETETADO! (ID #form-login)");
        
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                alert("Por favor, preencha todos os campos do LOGIN.");
                return;
            }
            
            // 1. Tenta fazer Login no Supabase Auth
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                alert(`Erro no Login: Verifique o email/senha ou se confirmou o email. Erro: ${error.message}`);
                console.error("Erro Supabase:", error);
            } else {
                // 2. Login bem-sucedido, redireciona para o Dashboard
                alert("Login bem-sucedido! Acedendo ao Painel de Controlo.");
                window.location.href = "dashboard.html";
            }
        });
    } else {
        console.log("login.js carregado com sucesso. Nenhum formulário de login específico encontrado (OK).");
    }
});

