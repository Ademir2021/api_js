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
exports.ConttrollersProducts = void 0;
const connect_1 = require("../connect");
class ConttrollersProducts {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (ex) {
                console.log("Error Occurred !!");
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = 0;
                const res = yield connect_1.client.query("SELECT * FROM products WHERE id_product > '" + id + "'");
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
                const { name, val_max, val_min, brand, sector, bar_code } = request.body;
                yield connect_1.client.query('INSERT INTO products("descric_product", "val_max_product", "val_min_product", "fk_brand", "fk_sector", "bar_code") VALUES (' + "'" + name + "', '" + val_max + "', '" + val_min + "', '" + brand + "', '" + sector + "', '" + bar_code + "');");
                const res = yield connect_1.client.query("SELECT descric_product FROM products WHERE descric_product = '" + name + "' LIMIT(1)");
                response.json("Produto registrado: " + res.rows[0].descric_product);
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
                /** */
            }
            catch (ex) {
                console.log("Erro Ocorred");
            }
        });
    }
    ;
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /** */
            }
            catch (ex) {
                console.log("Erro Ocorred");
            }
        });
    }
    ;
}
exports.ConttrollersProducts = ConttrollersProducts;
