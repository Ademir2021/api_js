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
exports.Person = void 0;
const connect_1 = require("../connect");
class Person {
    constructor(id, name, cpf, address, name_filial) {
        this._id = id;
        this._name = name;
        this._cpf = cpf;
        this._address = address;
        this._name_filial = name_filial;
    }
    ;
    insert(response, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connect_1.client.connect();
                yield connect_1.client.query('INSERT INTO persons("name_pers","cpf_pers","address_pers","fk_name_filial") VALUES (' + "'" + this._name + "', '" + this._cpf + "', '" + this._address + "', '" + this._name_filial + "');");
                const res = yield connect_1.client.query("SELECT *FROM persons");
                response.json(res.rows);
            }
            catch (err) {
                response.json("Ocorreu um erro !! Erro: " + err);
            }
            finally {
                yield connect_1.client.end();
                response.json("Cliente desconectado !!");
            }
        });
    }
    ;
}
exports.Person = Person;
