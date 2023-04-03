"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connect_1 = require("../connect");
class User {
    constructor(id, name, username, password) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
    }
    ;
    get name() {
        return this._name;
    }
    set name(nome) {
        if (this._name.length >= 2) {
            this._name = nome;
        }
        else {
            throw new Error("Erro de Validação");
        }
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("iniciando a conexão !");
                yield connect_1.client.connect();
                console.log("Conexão bem sucedida !");
                yield connect_1.client.query('insert into users("name", "username", "password") values (' + "'" + this._name + "', '" + this._username + "', '" + this._password + "');");
                console.log("User inserido na tabela!");
                const resultado = yield connect_1.client.query("select * from users");
                console.table(resultado.rows);
            }
            catch (ex) {
                console.log("Ocorreu um erro no setUsers. Erro: " + ex);
            }
            finally {
                connect_1.client.end();
            }
        });
    }
    ;
    insertAll(users, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json("iniciando a conexão !!");
                yield connect_1.client.connect();
                res.json("Conexão bem sucedida !");
                for (let i = 0; users.length > i; i++) {
                    yield connect_1.client.query('insert into users("name", "username", "password") values (' + "'" + users[i].name + "', '" + users[i].username + "', '" + users[i].password + "');");
                }
                res.json("Users inseridos na tabela com sucesso!");
                const resultado = yield connect_1.client.query("select * from users");
                console.table(resultado.rows);
                let result = resultado.rows;
                res.json(result);
            }
            catch (ex) {
                res.json("Ocorreu um erro no setUsers. Erro: " + ex);
            }
            finally {
                yield connect_1.client.end();
                res.json("Cliente desconectado !");
            }
        });
    }
    ;
    insertItens() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando a conexão !");
                yield connect_1.client.connect();
                console.log('Bem sucedida !');
                yield connect_1.client.query("UPDATE users SET name = '" + this._name + "', username = '" + this._username + "', password = '" + this._password + "' WHERE id = '" + this._id + "';");
                console.log("user alterado da tabela");
                const resultado = yield connect_1.client.query("SELECT * FROM users");
                console.table(resultado.rows);
            }
            catch (ex) {
                console.log("Ocorreu erro !!");
            }
            finally {
                yield connect_1.client.end();
                console.log("Cliente desconectado !!");
            }
        });
    }
    ;
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando a conexão !");
                yield connect_1.client.connect();
                console.log('Bem sucedida! ');
                const resultado = yield connect_1.client.query("SELECT * from users ");
                let user = resultado.rows;
                console.table(user);
            }
            catch (ex) {
                console.log("Ocorreu erro !");
            }
            finally {
                yield connect_1.client.end();
                console.log("Cliente desconectado !");
            }
        });
    }
    ;
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("iniciando uma conexão !");
            connect_1.client.connect();
            console.log("Conexão bem sucedida !");
            const resultado = yield connect_1.client.query("SELECT *FROM users WHERE id =  '" + this._id + "';");
            let user = resultado.rows;
            console.log(user);
            connect_1.client.end();
            console.log("Cliente desconectado !");
        });
    }
    ;
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Iniciando a conexão !");
                yield connect_1.client.connect();
                console.log('Bem sucedida!');
                yield connect_1.client.query("DELETE FROM users WHERE name = '" + this._name + "';");
                console.log("user removido da tabela");
                const resultado = yield connect_1.client.query("SELECT * FROM users !");
                console.table(resultado.rows);
            }
            catch (ex) {
                console.log("Ocorreu erro em user !");
            }
            finally {
                yield connect_1.client.end();
                console.log("Cliente desconectado !!");
            }
        });
    }
    ;
}
exports.User = User;
