// js/register.js
// Liga o Registo ao Supabase (MODO REAL)

// =========================================================================
// CHAVES REAIS DO SUPABASE
// =========================================================================
const SUPABASE_URL = "https://nlgxfeemybrizoydzhw.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ3hmZWVteWJyaXpveWR6aHciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMTc0NDczMSwiZXhwIjoxODU5NDExMTMxfQ.CzFuYS6XKvEwW5OsAAPAcHvuo-NVE4PUwDSKgqK9Yas"; 
// =========================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('form-register'); 

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = registerForm.querySelector('button[type="submit"]');
            
            // 1. Inicia o Processo: Desativa o botão
            submitButton.disabled = true;
            submitButton.textContent = "A registar...";
            
            const name = document.getElementById('register-name')?.value;
            const email = document.getElementById('register-email')?.value;
            const password = document.getElementById('register-password')?.value;
            
            if (!name || !email || !password) {
                alert("Por favor, preencha todos os campos do Registo.");
                submitButton.disabled = false;
                submitButton.textContent = "Criar Conta";
                return;
            }

            try {
                // 2. Tenta registar no Supabase Auth
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: { full_name: name } 
                    }
                });

                // 3. Processa o Resultado
                if (error) {
                    alert(`Erro no Registo: ${error.message}`);
                    console.error("Erro Supabase:", error);
                } else if (data.user) {
                    alert("Sucesso! Foi enviado um email para confirmar a sua conta. Por favor, confirme antes de fazer Login.");
                    // Fecha o modal e redireciona para a home page (index.html)
                    window.location.href = 'index.html'; 
                    return;
                }
            } catch (runtimeError) {
                // Erro de comunicação ou de rede
                console.error("Erro de Runtime ao registar:", runtimeError);
                alert("Erro de comunicação: Verifique a sua ligação ou a chave do Supabase.");
            }
            
            // 4. Finaliza o Processo: Reativa o botão em caso de falha
            submitButton.disabled = false;
            submitButton.textContent = "Criar Conta";
        });
    }
});

