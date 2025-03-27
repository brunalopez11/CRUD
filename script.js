const API_URL = "http://localhost:3000/estudante"; 

// Função para carregar estudantes
function pegaTodos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error("Erro: Resposta da API não é uma lista válida", data);
                return;
            }
            let lista = document.getElementById("listaEstudantes");
            lista.innerHTML = "";
            data.forEach(estudante => {
                let row = `<tr>
                    <td>${estudante.id}</td>
                    <td>${estudante.nome}</td>
                    <td>${estudante.email}</td>
                </tr>`;
                lista.insertAdjacentHTML("beforeend", row);
            });
        })
        .catch(error => console.error("Erro ao buscar estudantes:", error));
}

// Função para cadastrar estudante
function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(() => {
        alert("Estudante cadastrado com sucesso!");
        pegaTodos();
    })
    .catch(error => console.error("Erro ao cadastrar estudante:", error));
}

// Função para atualizar estudante
function atualizar() {
    let id = document.getElementById("updateId").value;
    let nome = document.getElementById("updateNome").value;
    let email = document.getElementById("updateEmail").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(() => {
        alert("Dados atualizados!");
        pegaTodos();
    })
    .catch(error => console.error("Erro ao atualizar estudante:", error));
}

// Função para deletar estudante
function apagar() {
    let id = document.getElementById("deleteId").value;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(() => {
        alert("Estudante deletado!");
        pegaTodos();
    })
    .catch(error => console.error("Erro ao deletar estudante:", error));
}
