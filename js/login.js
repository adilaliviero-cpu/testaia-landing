// Configuração do Supabase (Substitua pela sua URL e Chave se tiver, senão usamos modo simulação)
const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANONIMA";

// Se não tivermos Supabase configurado ainda, usamos um modo de teste local para ver funcionar
const MODO_TESTE = true; 

document.addEventListener('DOMContentLoaded', () => {
    // Tenta encontrar o formulário de login na página
    const loginForm = document.querySelector('form'); 

    if(loginForm) {
        console.log("Formulário de login detectado!"); // Para confirmar no Console

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede a página de recarregar
            
            // Pega os dados dos campos
            // Nota: Certifique-se que no HTML os inputs têm name="email" e name="password"
            const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector('input[type="password"]') || document.querySelector('input[name="password"]');
            const botao = loginForm.querySelector('button');

            const email = emailInput ? emailInput.value : "";
            const password = passwordInput ? passwordInput.value : "";

            if (!email || !password) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Efeito visual de carregamento no botão
            const textoOriginal = botao.innerText;
            botao.innerText = "A entrar...";
            botao.disabled = true;
            botao.style.opacity = "0.7";

            try {
                if (MODO_TESTE) {
                    // --- SIMULAÇÃO (Para testar sem Backend) ---
                    console.log("Tentativa de login simulada com:", email);
                    
                    // Espera 1.5 segundos para parecer real
                    await new Promise(r => setTimeout(r, 1500)); 
                    
                    alert("Login realizado com sucesso! (Modo Teste)\nBem-vindo(a), " + email);
                    
                    // Aqui redirecionaríamos para o painel
                    // window.location.href = "dashboard.html"; 
                } else {
                    // --- SUPABASE REAL (Descomente quando tiver as chaves) ---
                    /*
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });
                    if (error) throw error;
                    window.location.href = "dashboard.html";
                    */
                }
            } catch (erro) {
                console.error(erro);
                alert("Erro ao entrar: " + erro.message);
            } finally {
                // Restaura o botão ao estado normal
                botao.innerText = textoOriginal;
                botao.disabled = false;
                botao.style.opacity = "1";
            }
        });
    }
});


