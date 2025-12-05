// js/criarTeste.js

async function criarNovoTeste(nomeTeste, urlAlvo) {
    // Esta função é chamada pelo formulário
    console.log("A executar função: criarNovoTeste");
    
    // Validação
    if (!nomeTeste || !urlAlvo) {
        alert("Erro: Por favor, insira o nome do teste e a URL.");
        return;
    }
    
    // Simulação de Sucesso
    await new Promise(r => setTimeout(r, 1500)); 
    alert(`Sucesso (Simulado)! O teste "${nomeTeste}" para a URL ${urlAlvo} foi criado!`);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("-> criarTeste.js (Lógica de Criação) carregado com sucesso.");

    const formCriacao = document.getElementById('form-criar-teste');
    
    if (formCriacao) {
        formCriacao.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio do formulário

            const nome = document.getElementById('nome-teste')?.value;
            const url = document.getElementById('url-teste')?.value;

            criarNovoTeste(nome, url);
        });
    } else {
        console.warn("Aviso: Formulário #form-criar-teste não encontrado. A função de criar teste não será ativada.");
    }
});

