const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs');

// Rota com path parameter
app.get("/produtos/:pagina", (req, res) => {
    try {
        const { pagina } = req.params; // pega o número da página
        const page = parseInt(pagina);

        // Ler o arquivo JSON
        const data = fs.readFileSync('./produtos.json', 'utf-8');
        let produtos = JSON.parse(data);

        // Definição de limite por página
        const limite = 10;
        let inicio, fim;

        if (page === 1) {
            inicio = 0;
            fim = limite;
        } else if (page === 2) {
            inicio = 10;
            fim = 20;
        } else if (page === 3) {
            inicio = 20;
            fim = 30;
        } else {
            return res.status(400).send("Página inválida! Use 1, 2 ou 3.");
        }

        // Fatia os produtos de acordo com a página
        const resultado = produtos.slice(inicio, fim);

        res.status(200).json(resultado);

    } catch (error) {
        console.error("Erro ao ler o arquivo produtos.json", error);
        res.status(500).send("Erro interno no servidor");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
