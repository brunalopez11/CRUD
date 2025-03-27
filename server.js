const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições do frontend

let estudantes = [];
let idAtual = 1;

// Rota para pegar todos os estudantes
app.get("/estudante", (req, res) => {
    res.json(estudantes);
});

// Rota para cadastrar estudante
app.post("/estudante", (req, res) => {
    const { nome, email } = req.body;
    const novoEstudante = { id: idAtual++, nome, email };
    estudantes.push(novoEstudante);
    res.json(novoEstudante);
});

// Rota para atualizar estudante
app.put("/estudante/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    let estudante = estudantes.find(e => e.id == id);
    if (!estudante) return res.status(404).json({ error: "Estudante não encontrado" });

    estudante.nome = nome;
    estudante.email = email;
    res.json(estudante);
});

// Rota para deletar estudante
app.delete("/estudante/:id", (req, res) => {
    const { id } = req.params;
    estudantes = estudantes.filter(e => e.id != id);
    res.json({ message: "Estudante deletado" });
});

// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
