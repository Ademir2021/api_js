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
exports.ConttrollersUSers = void 0;
const connect_1 = require("../../connect");
class ConttrollersUSers {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (err) {
                console.log("Error Occurred !!" + err);
            }
        });
    }
    ;
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = request.params;
                const res = yield connect_1.client.query("SELECT id, username, password FROM users WHERE username = '" + username + "' LIMIT(1)");
                response.json(res.rows);
            }
            catch (err) {
                response.json("Error Occurred !!" + err);
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = 0;
                const res = yield connect_1.client.query("SELECT * FROM users");
                response.json(res.rows);
            }
            catch (err) {
                console.log("Error Occurred !!" + err);
            }
        });
    }
    ;
    selectOneUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const res = yield connect_1.client.query("SELECT * FROM users WHERE id = '" + id + "'");
                response.json(res.rows);
            }
            catch (err) {
                console.log("Error Occurred !!" + err);
            }
        });
    }
    ;
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, password } = request.body;
                const res_username = yield connect_1.client.query("SELECT username FROM users WHERE username = '" + username + "' LIMIT(1);");
                try {
                    username !== res_username.rows[0].username;
                    response.json("Email já cadastrado: " + username);
                }
                catch (_a) {
                    yield connect_1.client.query('INSERT INTO users("name", "username", "password") VALUES (' + "'" + name + "', '" + username + "', '" + password + "');");
                    const res_name = yield connect_1.client.query("SELECT name FROM users WHERE name = '" + name + "' LIMIT(1)");
                    response.json("Registrado com successo: " + res_name.rows[0].name);
                }
            }
            catch (err) {
                response.json("Error Occurred !" + err);
            }
        });
    }
    ;
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const { name, username, password } = request.body;
                yield connect_1.client.query("UPDATE users SET updated_at = now(), name = '" + name + "', username = '" + username + "', password = '" + password + "' WHERE id = '" + id + "'");
                response.json("Atualizado com sucesso !");
            }
            catch (err) {
                response.json("Error Ocorred !!: " + err);
            }
        });
    }
    ;
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                yield connect_1.client.query("DELETE FROM users WHERE id = '" + id + "'");
                response.json("Removido com sucesso");
            }
            catch (err) {
                console.log("Error Ocorred: " + err);
            }
        });
    }
    ;
}
exports.ConttrollersUSers = ConttrollersUSers;
