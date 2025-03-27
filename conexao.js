import mysql from 'mysql2';

class ConexaoDB {
    // Conexão com MySQL
    static connect() {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'fatec'
        });
        connection.connect();
        return connection;
    }

    // Selecionar todos os estudantes
    static getAllStudents(callback) {
        let connection = ConexaoDB.connect();
        let sql = "SELECT * FROM student";
        connection.query(sql, (error, results) => {
            if (error) throw error;
            callback(results);
        });
        connection.end();
    }

    // Selecionar por nome
    static getStudentsByName(name, callback) {
        let connection = ConexaoDB.connect();
        let sql = "SELECT * FROM student WHERE nome = ?";
        connection.query(sql, [name], (error, results) => {
            if (error) throw error;
            callback(results);
        });
        connection.end();
    }

    // Salvar novo estudante
    static save(student, callback) {
        let connection = ConexaoDB.connect();
        let sql = "INSERT INTO student SET ?";
        connection.query(sql, student, (error, results) => {
            if (error) throw error;
            student.id = results.insertId;
            callback(student);
        });
        connection.end();
    }

    // Atualizar estudante
    static update(student, callback) {
        let connection = ConexaoDB.connect();
        let sql = "UPDATE student SET ? WHERE id = ?";
        connection.query(sql, [student, student.id], (error) => {
            if (error) throw error;
            callback(student);
        });
        connection.end();
    }

    // Apagar estudante por ID
    static delete(id, callback) {
        let connection = ConexaoDB.connect();
        let sql = "DELETE FROM student WHERE id = ?";
        connection.query(sql, [id], (error) => {
            if (error) throw error;
            callback(id);
        });
        connection.end();
    }
}

export default ConexaoDB;
