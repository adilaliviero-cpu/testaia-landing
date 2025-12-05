// js/login.js
// Liga o Login ao Supabase (MODO REAL)

// =========================================================================
// ATENÇÃO: SUBSTITUA ESTAS DUAS LINHAS PELAS SUAS CHAVES REAIS DO SUPABASE
// =========================================================================
const SUPABASE_URL = "https://njgxfeemwybiuzoymdhw.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3hmZWVtd3liaXV6b3ltZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI4OTAsImV4cCI6MjA4MDQyODg5MH0.-eldoV3CvMp0QmwuDxCFPjr4ztwJ1wZp4pB6ZP2TJJU"; 
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


