// js/executarTeste.js

// Esta função é chamada pelos botões na tabela do dashboard (onclick="executarTeste(ID)")
window.executarTeste = async function(idTeste) {
    console.log(`Solicitação de execução do teste ID: ${idTeste}...`);
    
    const botaoExecutar = document.getElementById(`btn-run-${idTeste}`);
    if(botaoExecutar) {
        botaoExecutar.innerText = "Rodando...";
        botaoExecutar.disabled = true;
    }

    try {
        // Simulação de tempo de execução
        await new Promise(r => setTimeout(r, 2000));

        console.log(`Teste ID ${idTeste} finalizado!`);
        alert(`O teste ${idTeste} foi executado com sucesso!`);

    } catch (error) {
        console.error("Falha na execução:", error);
    } finally {
        if(botaoExecutar) {
            botaoExecutar.innerText = "Re-executar";
            botaoExecutar.disabled = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("-> executarTeste.js (Lógica de Execução) carregado com sucesso.");
});

