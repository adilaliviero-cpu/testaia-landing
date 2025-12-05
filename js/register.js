// js/register.js
// Liga o Registo ao Supabase (MODO REAL)

// =========================================================================
// ATENÇÃO: CONFIRMA QUE O URL E A CHAVE SÃO OS MESMOS DO TEU SUPABASE
// =========================================================================
const SUPABASE_URL = "https://njgxfeemwybiuzoymdhw.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3hmZWVtd3liaXV6b3ltZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3NDQ3MzEsImV4cCI6MTg1OTQxMTEzMX0.5UoZkqfG0rA5u1uQzyx6mY7eC0Ts0-FU0UXDvabJ1Ao";
// =========================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('form-register'); 

    if (!registerForm) {
        console.log("register.js carregado, mas nenhum formulário #form-register foi encontrado.");
        return;
    }

    console.log("FORMULÁRIO DE REGISTO ENCONTRADO! (#form-register)");

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('register-name')?.value.trim();
        const email = document.getElementById('register-email')?.value.trim();
        const password = document.getElementById('register-password')?.value.trim();

        if (!name || !email || !password) {
            alert("Por favor, preencha todos os campos do Registo.");
            return;
        }

        try {
            // 1. Tenta registar no Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name } // Guarda o nome do utilizador no perfil
                }
            });

            if (error) {
                alert(`❌ Erro no Registo: ${error.message}`);
                console.error("Erro Supabase:", error);
                return;
            }

            if (data.user) {
                alert("✅ Sucesso! Foi enviado um email para confirmar a sua conta. Confirme antes de fazer Login.");
                window.location.href = 'auth.html'; 
            }

        } catch (err) {
            console.error("Erro inesperado:", err);
            alert("Ocorreu um erro inesperado. Verifique a consola.");
        }
    });
});
