// js/register.js

// Configuração (mesma do login.js)
const SUPABASE_URL_REG = "SUA_URL_DO_SUPABASE";
const SUPABASE_KEY_REG = "SUA_CHAVE_ANONIMA";
const MODO_TESTE_REG = true; 

document.addEventListener('DOMContentLoaded', () => {
    // Procura o formulário de registo (assumindo que existe um form com id="form-register" ou é o único da página)
    const registerForm = document.getElementById('form-register') || document.querySelector('form');

    if (registerForm) {
        console.log("Formulário de registo detectado!");

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Tenta obter os campos pelo ID ou pelo tipo
            const nomeInput = document.getElementById('name') || document.querySelector('input[type="text"]');
            const emailInput = document.getElementById('email') || document.querySelector('input[type="email"]');
            const passwordInput = document.getElementById('password') || document.querySelector('input[type="password"]');
            const botao = registerForm.querySelector('button');

            const nome = nomeInput ? nomeInput.value : "Utilizador";
            const email = emailInput ? emailInput.value : "";
            const password = passwordInput ? passwordInput.value : "";

            if (!email || !password) {
                alert("Por favor, preencha pelo menos Email e Senha.");
                return;
            }

            // Feedback visual
            const textoOriginal = botao.innerText;
            botao.innerText = "A criar conta...";
            botao.disabled = true;

            try {
                if (MODO_TESTE_REG) {
                    // --- SIMULAÇÃO ---
                    console.log(`Criando conta para: ${nome} (${email})`);
                    await new Promise(r => setTimeout(r, 1500)); // Espera 1.5s
                    
                    alert("Conta criada com sucesso! (Modo Teste)\nVocê pode fazer login agora.");
                    // Redirecionar para login ou dashboard
                    // window.location.href = "login.html"; 
                } else {
                    // --- SUPABASE REAL ---
                    /*
                    const { data, error } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                        options: {
                            data: { full_name: nome }
                        }
                    });

                    if (error) throw error;
                    alert("Verifique o seu email para confirmar a conta!");
                    */
                }
            } catch (erro) {
                console.error(erro);
                alert("Erro ao registar: " + erro.message);
            } finally {
                botao.innerText = textoOriginal;
                botao.disabled = false;
            }
        });
    }
});

