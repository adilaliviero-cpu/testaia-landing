// js/executarTeste.js
// Lógica para executar um teste e mostrar o resultado

async function executarTeste(idTeste) {
    // Simulação apenas para testar se o ficheiro está a funcionar
    console.log(`A simular a execução do teste ID: ${idTeste}.`);
    alert("Teste finalizado com sucesso (Simulado)! ✅");
}

// Verificar se o JS carregou corretamente
document.addEventListener('DOMContentLoaded', () => {
    console.log("-> executarTeste.js carregado com sucesso.");
});
