import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// FRONTEND: usar SOMENTE a anon key
const SUPABASE_URL = "https://njgxfeemwybiuzoymdhw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3hmZWVtd3liaXV6b3ltZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI4OTAsImV4cCI6MjA4MDQyODg5MH0.-eldoV3CvMp0QmwuDxCFPjr4ztwJ1wZp4pB6ZP2TJJU" I"; // ⚠️ NÃO service_role
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function criarNovoTeste(nomeTeste, urlAlvo) {
    if (!nomeTeste || !urlAlvo) return alert("Preencha todos os campos.");

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        alert("Precisa estar logado.");
        return;
    }

    const { error } = await supabase
        .from('testes')
        .insert([{ user_id: user.id, nome_teste: nomeTeste, url_alvo: urlAlvo, status: 'pendente' }]);

    if (error) {
        console.error("Erro ao criar teste:", error);
        alert(`Erro ao criar teste: ${error.message || JSON.stringify(error)}`);
        return;
    }

    alert(`Teste "${nomeTeste}" criado com sucesso!`);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-criar-teste');
    if (!form) return console.warn("Formulário #form-criar-teste não encontrado.");

    form.addEventListener('submit', e => {
        e.preventDefault();
        const nome = document.getElementById('nome-teste')?.value;
        const url = document.getElementById('url-teste')?.value;
        criarNovoTeste(nome, url);
    });
});
