// js/criarTeste.js

// Função para criar um novo teste
async function criarNovoTeste(nomeTeste, urlAlvo) {
    console.log("Iniciando criação do teste:", nomeTeste);

    // Validação básica
    if (!nomeTeste || !urlAlvo) {
        alert("Erro: Preencha o nome do teste e a URL.");
        return;
    }

    try {
        // Verifica se estamos no modo de teste (definido no login.js)
        // Se a variável não existir, assume false
        const isTeste = typeof MODO_TESTE !== 'undefined' ? MODO_TESTE : false;

        if (isTeste) {
            // --- SIMULAÇÃO ---
            console.log("Simulando criação no banco de dados...");
            await new Promise(r => setTimeout(r, 1000)); // Espera 1s
            
            alert(`Sucesso! O teste "${nomeTeste}" foi criado (Modo Simulação).`);
            return { id: 123, status: "criado" };
        } else {
            // --- SUPABASE REAL ---
            /*
            const { data, error } = await supabase
                .from('testes')
                .insert([
                    { nome: nomeTeste, url: urlAlvo, status: 'pendente', data_criacao: new Date() },
                ])
                .select();

            if (error) throw error;
            alert("Teste salvo no Supabase!");
            return data;
            */
           console.log("Supabase ainda não configurado completamente.");
        }

    } catch (erro) {
        console.error("Erro ao criar teste:", erro);
        alert("Ocorreu um erro ao tentar criar o teste.");
    }
}

// Se houver um formulário de criação na página, adiciona o evento
document.addEventListener('DOMContentLoaded', () => {
    const formCriacao = document.getElementById('form-criar-teste');
    
    if (formCriacao) {
        formCriacao.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome-teste').value;
            const url = document.getElementById('url-teste').value;
            criarNovoTeste(nome, url);
        });
    }
});

