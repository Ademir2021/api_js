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
exports.ConttrollersPersons = void 0;
const connect_1 = require("../../connect");
class ConttrollersPersons {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = request.params;
            try {
                const res_ = yield connect_1.client.query("SELECT * FROM users WHERE  id = '" + user_id + "'");
                if (res_.rows[0].privilege != 2) {
                    const res = yield connect_1.client.query("SELECT * FROM persons where fk_id_user = '" + user_id + "'");
                    response.json(res.rows);
                }
                else {
                    const res = yield connect_1.client.query("SELECT * FROM persons");
                    response.json(res.rows);
                }
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    selectOne(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const res = yield connect_1.client.query("SELECT * FROM persons WHERE id_person = '" + id + "'");
                response.json(res.rows);
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    selectOneUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = request.params;
                const res = yield connect_1.client.query("SELECT * FROM persons WHERE fk_id_user = '" + user_id + "'");
                response.json(res.rows);
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const person = request.body;
                const res_cpf = yield connect_1.client.query("SELECT cpf_pers FROM persons WHERE cpf_pers = '" + person.cpf_pers + "' LIMIT(1)");
                try {
                    person.cpf_pers !== res_cpf.rows[0].cpf_pers;
                    response.json("CPF pertence a outra Pessoa ! " + person.cpf_pers);
                }
                catch (_a) {
                    yield connect_1.client.query('INSERT INTO persons(name_pers, cpf_pers, phone_pers, address_pers, fk_name_filial, fk_id_user, bairro_pers, fk_cep) VALUES (' + "'" + person.name_pers + "', '" + person.cpf_pers + "', '" + person.phone_pers + "', '" + person.address_pers + "', '" + person.fk_name_filial + "', '" + person.fk_id_user + "', '" + person.bairro_pers + "', '" + person.fk_cep + "');");
                    const res = yield connect_1.client.query("SELECT name_pers FROM persons WHERE name_pers = '" + person.name_pers + "' LIMIT(1)");
                    response.json("Registrado com sucesso: " + res.rows[0].name_pers);
                }
            }
            catch (err) {
                console.log("Error Occurred !!: " + err);
            }
        });
    }
    ;
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const person = request.body;
                yield connect_1.client.query("UPDATE persons SET updated_at =  now(), name_pers = '" + person.name_pers + "', cpf_pers = '" + person.cpf_pers + "', phone_pers ='" + person.phone_pers + "', address_pers ='" + person.address_pers + "', bairro_pers = '" + person.bairro_pers + "', fk_cep = '" + person.fk_cep + "', fk_name_filial = '" + person.fk_name_filial + "' WHERE id_person = '" + id + "'");
                response.json("Cliente atualizado com sucesso ! ");
            }
            catch (err) {
                response.json("Error Occurred ! " + err);
            }
        });
    }
    ;
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                yield connect_1.client.query("DELETE FROM persons WHERE id_person = '" + id + "'");
                response.json("Removido com sucesso !");
            }
            catch (err) {
                response.json("Error Ocorred ! " + err);
            }
        });
    }
    ;
}
exports.ConttrollersPersons = ConttrollersPersons;
