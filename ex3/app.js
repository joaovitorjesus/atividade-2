const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs');

app.get("/eventos", (req, res) => {
    try {
        const { data } = req.query; 

        // ler o arquivo JSON
        const conteudo = fs.readFileSync('./eventos.json', 'utf-8');

        // converter JSON para objeto JS
        let eventos = JSON.parse(conteudo);

        // se veio data na query, filtra
        if (data) {
            eventos = eventos.filter(evento => evento.data === data);
        }

        res.status(200).json(eventos);

    } catch (error) {
        console.error("Erro ao ler o arquivo eventos.json", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});