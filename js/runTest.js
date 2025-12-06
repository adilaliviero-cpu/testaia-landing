// js/runTest.js
// Responsável por buscar os testes do utilizador logado e atualizar o Dashboard.

// =========================================================================
// CHAVES REAIS DO SUPABASE
// =========================================================================
const SUPABASE_URL = "https://ngxfeemybrizoydzhw.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3hmZWVtd3liaXV6b3ltZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI4OTAsImV4cCI6MjA4MDQyODg5MH0.-eldoV3CvMp0QmwuDxCFPjr4ztwJ1wZp4pB6ZP2TJJU" "; 
// =========================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Função auxiliar para formatar a data
function formatarData(data) {
    if (!data) return '---';
    const d = new Date(data);
    return `${d.toLocaleDateString('pt-PT')} ${d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}`;
}

// Mapeia o status para cores Tailwind
function obterStatusHTML(status) {
    let cor = 'bg-gray-100 text-gray-500';
    if (status === 'pendente') cor = 'bg-yellow-100 text-yellow-800';
    if (status === 'sucesso') cor = 'bg-green-100 text-green-800';
    if (status === 'falha') cor = 'bg-red-100 text-red-800';
    
    return `<span class="${cor} px-2 py-1 rounded-full text-xs capitalize">${status}</span>`;
}

// -------------------------------------------------------------------------
// FUNÇÃO PRINCIPAL: BUSCAR E EXIBIR DADOS
// -------------------------------------------------------------------------
async function listarTestesDoUtilizador() {
    const tabelaBody = document.getElementById('testes-tabela-body');
    if (!tabelaBody) return; 

    tabelaBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-400">A verificar estado do Login e permissões...</td></tr>';
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        tabelaBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-blue-500">Faça login para ver o histórico de testes.</td></tr>';
        return;
    }
    
    // 2. Buscar testes do Supabase pertencentes ao user_id
    try {
        const { data: testes, error } = await supabase
            .from('testes')
            .select('id, nome_teste, status, created_at')
            .eq('user_id', user.id) // FILTRA PELO ID DO UTILIZADOR
            .order('created_at', { ascending: false }); 

        if (error) {
            throw new Error(`ERRO FATAL RLS/SELECT: ${error.message}.`);
        }

        // 3. Desenhar na Tabela
        if (testes.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500">Nenhum teste criado ainda. Crie o seu primeiro teste acima.</td></tr>';
        } else {
            tabelaBody.innerHTML = '';
            
            testes.forEach(teste => {
                const row = `
                    <tr>
                        <td class="px-6 py-4 font-medium text-gray-900">${teste.nome_teste}</td>
                        <td class="px-6 py-4">${obterStatusHTML(teste.status)}</td>
                        <td class="px-6 py-4">${formatarData(teste.created_at)}</td>
                        <td class="px-6 py-4 text-right">
                            <button onclick="executarTeste('${teste.id}')" class="text-blue-600 hover:text-900">Re-executar</button>
                        </td>
                    </tr>
                `;
                tabelaBody.insertAdjacentHTML('beforeend', row);
            });
            
            // Atualizar contagem total de testes
            document.getElementById('testes-executados').innerText = testes.length;
        }

    } catch (erro) {
        console.error("Erro Crítico de RLS:", erro);
        tabelaBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">ERRO RLS: Não foi possível ler os dados. Verifique as Políticas de SELECT.</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', listarTestesDoUtilizador);

