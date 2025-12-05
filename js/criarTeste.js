// js/criarTeste.js
// Lógica para criar um novo teste e gravar na tabela 'testes' do Supabase (MODO REAL)

// =========================================================================
// ATENÇÃO: CONFIRMA QUE O URL E A CHAVE SÃO OS MESMOS DO TEU SUPABASE
// =========================================================================
const SUPABASE_URL = "https://njgxfeemwybiuzoymdhw.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3hmZWVtd3liaXV6b3ltZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI4OTAsImV4cCI6MjA4MDQyODg5MH0.-eldoV3CvMp0QmwuDxCFPjr4ztwJ1wZp4pB6ZP2TJJU";
// =========================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Função principal chamada pelo formulário do Dashboard
async function criarNovoTeste(nomeTeste, urlAlvo) {
    console.log("Iniciando criação do teste no Supabase:", nomeTeste);

    if (!nomeTeste?.trim() || !urlAlvo?.trim()) {
        alert("Erro: Por favor, preencha o nome do teste e a URL.");
        return;
    }

    try {
        // Obtém o utilizador logado
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            alert("Erro: Precisa estar logado para criar um teste. Redirecionando para login.");
            console.error("Erro ao obter utilizador:", userError);
            window.location.href = 'auth.html';
            return;
        }

        // Insere os dados na tabela 'testes'
        const { error } = await supabase
            .from('testes')
            .insert([
                { 
                    user_id: user.id, 
                    nome_teste: nomeTeste.trim(), 
                    url_alvo: urlAlvo.trim(), 
                    status: 'pendente' 
                },
            ]);

        if (error) throw error;

        alert(`✅ Sucesso! O teste "${nomeTeste}" foi salvo no Supabase. Verifique a tabela 'testes'.`);

    } catch (erro) {
        console.error("Erro ao criar teste no Supabase:", erro);
        alert(`Ocorreu um erro ao tentar criar o teste. Causa: ${erro.message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("-> criarTeste.js carregado com sucesso.");

    const formCriacao = document.getElementById('form-criar-teste');

    if (!formCriacao) {
        console.warn("Aviso: Formulário #form-criar-teste não encontrado. Função de criar teste desativada.");
        return;
    }

    formCriacao.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio do formulário

        const nome = document.getElementById('nome-teste')?.value;
        const url = document.getElementById('url-teste')?.value;

        criarNovoTeste(nome, url);
    });
});
