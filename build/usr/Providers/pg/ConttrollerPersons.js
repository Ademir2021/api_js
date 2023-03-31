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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
                console.log("Error Occurred !!: " + err);
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = 0;
                const res = yield connect_1.client.query("SELECT * FROM persons WHERE id_person > '" + id + "'");
                response.json(res.rows);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = request.body, { cpf } = _a, rest = __rest(_a, ["cpf"]);
                const res_cpf = yield connect_1.client.query("SELECT cpf_pers FROM persons WHERE cpf_pers = '" + cpf + "' LIMIT(1)");
                try {
                    cpf !== res_cpf.rows[0].cpf_pers;
                    response.json("CPF pertence a outra Pessoa !! :" + cpf);
                }
                catch (_b) {
                    yield connect_1.client.query('INSERT INTO persons("name_pers", "cpf_pers", "address_pers", "fk_name_filial") VALUES (' + "'" + rest.name + "', '" + cpf + "', '" + rest.address + "', '" + rest.filial + "');");
                    const res = yield connect_1.client.query("SELECT name_pers FROM persons WHERE name_pers = '" + rest.name + "' LIMIT(1)");
                    response.json("Pessoa registrada: " + res.rows[0].name_pers);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const _a = request.body, { cpf } = _a, rest = __rest(_a, ["cpf"]);
                yield connect_1.client.query("UPDATE persons SET name_pers = '" + rest.name + "', cpf_pers = '" + cpf + "', address_pers ='" + rest.address + "', fk_name_filial = '" + rest.filial + "' WHERE id_product = '" + id + "'");
                response.json("Update com sucess !!");
            }
            catch (err) {
                console.log("Erro Ocorred");
            }
        });
    }
    ;
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                yield connect_1.client.query("DELETE FROM persons WHERE id_product = '" + id + "'");
                response.json("Produto removido da tabela");
            }
            catch (err) {
                response.json("Error Ocorred !!" + err);
            }
        });
    }
    ;
}
exports.ConttrollersPersons = ConttrollersPersons;