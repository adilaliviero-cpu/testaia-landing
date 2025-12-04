// js/executarTeste.js

// Função para rodar o teste
async function executarTeste(idTeste) {
    console.log(`Solicitando execução do teste ID: ${idTeste}...`);
    
    const botaoExecutar = document.getElementById(`btn-run-${idTeste}`);
    if(botaoExecutar) botaoExecutar.innerText = "Rodando...";

    try {
        // Simulação de tempo de execução de IA
        await new Promise(r => setTimeout(r, 2000));

        console.log("Teste finalizado!");
        alert(`O teste ${idTeste} foi executado com sucesso! Sem erros detectados.`);

        if(botaoExecutar) {
            botaoExecutar.innerText = "Re-executar";
            botaoExecutar.classList.add("bg-green-600");
        }

    } catch (error) {
        console.error("Falha na execução:", error);
        alert("Erro ao executar o teste.");
    }
}

