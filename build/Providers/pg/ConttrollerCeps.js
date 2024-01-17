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
exports.ConttrollerCeps = void 0;
const connect_1 = require("../../connect");
;
class ConttrollerCeps {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (err) {
                console.log("Error Occurred !" + err);
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield connect_1.client.query("SELECT * FROM ceps");
                response.json(res.rows);
            }
            catch (err) {
                console.log("Error Ocurred ! " + err);
            }
        });
    }
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cep = request.body;
                const res_cep = yield connect_1.client.query("SELECT num_cep FROM ceps WHERE num_cep = '" + cep.num_cep + "' LIMIT(1)");
                try {
                    cep.num_cep !== res_cep.rows[0].num_cep;
                    response.json("CEP já Cadastrado ! " + cep.num_cep);
                }
                catch (_a) {
                    yield connect_1.client.query('INSERT INTO cities(name_city, uf, code_ibge, code_state_revenue, code_country, code_federal_revenue) VALUES (' + "'" + cep.city + "', '" + cep.uf + "', '" + "0.0" + "' ,'" + 0.0 + "', '" + 1 + "', '" + 0 + "');");
                    const res_num_city = yield connect_1.client.query("SELECT MAX(id_city) FROM cities");
                    const num_city = res_num_city.rows[0].max;
                    yield connect_1.client.query('INSERT INTO ceps(num_cep, code_city, type_cep, public_place, num_initial, num_final, complement, city, uf) VALUES (' + "'" + cep.num_cep + "', '" + num_city + "', '" + cep.type_cep + "', '" + cep.public_place + "', '" + cep.num_final + "', '" + cep.num_final + "', '" + cep.complement + "', '" + cep.city + "', '" + cep.uf + "');");
                    const res = yield connect_1.client.query("SELECT num_cep FROM ceps WHERE num_cep = '" + cep.num_cep + "' LIMIT(1)");
                    response.json("CEP registrado com sucesso: " + res.rows[0].num_cep);
                }
            }
            catch (err) {
                console.log("Error Occurred !!: " + err);
            }
        });
    }
    ;
}
exports.ConttrollerCeps = ConttrollerCeps;
