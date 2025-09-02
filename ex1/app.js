const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs');

// Rota para listar usuários
app.get("/usuarios", (req, res) => {
    try {
        // Lê o arquivo usuarios.json
        const data = fs.readFileSync('./usuarios.json', 'utf-8');

        // Converte JSON para objeto JS
        let usuarios = JSON.parse(data);

        // Retorna a lista de usuários
        res.status(200).json(usuarios);

    } catch (error) {
        console.error("Erro ao ler o arquivo usuarios.json:", error);
        res.status(500).send("Erro interno no servidor");
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});