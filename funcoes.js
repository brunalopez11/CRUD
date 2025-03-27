import ConexaoDB from './conexao.js';

// Buscar todos os estudantes
function pegaTodos() {
    ConexaoDB.getAllStudents((students) => {
        students.forEach(student => {
            console.log(`${student.id}: ${student.nome}: ${student.email}`);
        });
    });
}

// Buscar estudante por nome
function pegaPorNome(nome) {
    ConexaoDB.getStudentsByName(nome, (students) => {
        students.forEach(student => {
            console.log(`${student.id}: ${student.nome}: ${student.email}`);
        });
    });
}

// Cadastrar novo estudante
function cadastrar(nome, email) {
    let student = { nome, email };
    ConexaoDB.save(student, (newStudent) => {
        console.log(`Estudante cadastrado! ${newStudent.id}: ${newStudent.nome}: ${newStudent.email}`);
    });
}

// Atualizar estudante
function atualizar(id, nome, email) {
    let student = { id, nome, email };
    ConexaoDB.update(student, (updatedStudent) => {
        console.log(`Dados atualizados! ${updatedStudent.id}: ${updatedStudent.nome}: ${updatedStudent.email}`);
    });
}

// Deletar estudante
function apagar(id) {
    ConexaoDB.delete(id, (deletedId) => {
        console.log(`Estudante deletado! ID: ${deletedId}`);
    });
}

export { pegaTodos, pegaPorNome, cadastrar, atualizar, apagar };
