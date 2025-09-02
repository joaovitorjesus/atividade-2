const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs');

// Rota para listar usuários (com filtro opcional por nome)
app.get("/usuarios", (req, res) => {
    try {
        const { nome } = req.query; // query param: ?nome=joao

        // Lê o arquivo usuarios.json
        const data = fs.readFileSync('./usuarios.json', 'utf-8');

        // Converte JSON para objeto JS
        let usuarios = JSON.parse(data);

        // Se o parâmetro nome for enviado, filtra
        if (nome) {
            usuarios = usuarios.filter(usuario =>
                usuario.nome.toLowerCase().includes(nome.toLowerCase())
            );
        }

        // Retorna a lista (filtrada ou completa)
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
