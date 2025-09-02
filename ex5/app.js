const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs');

app.get("/produtos", (req, res) => {
    try {
        const { nomeProduto } = req.query; // pega o parâmetro ?nomeProduto=...

        // Ler o arquivo JSON (corrigido extensão para .json)
        const data = fs.readFileSync('./produtos.json', 'utf-8');

        // Conversão de JSON em objeto JS
        let produtos = JSON.parse(data);

        // Se o usuário mandou ?nomeProduto=...
        if (nomeProduto) {
            produtos = produtos.filter(produto =>
                produto.nome.toLowerCase().includes(nomeProduto.toLowerCase())
            );
        }

        res.status(200).json(produtos);

    } catch (error) {
        console.error("Erro ao ler o arquivo produtos.json", error);
        res.status(500).json("Erro interno no servidor");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
