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
const connect_1 = require("../../connect");
class ConttrollersProducts {
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
    selectHome(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield connect_1.client.query("SELECT * FROM products ORDER BY descric_product");
                response.json(res.rows);
            }
            catch (err) {
                console.log("Error Ocurred ! " + err);
            }
        });
    }
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = request.params;
            try {
                const res_ = yield connect_1.client.query("SELECT * FROM users WHERE  id = '" + user_id + "'");
                if (res_.rows[0].privilege === '2') {
                    const res = yield connect_1.client.query("SELECT * FROM products ORDER BY id_product");
                    response.json(res.rows);
                }
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    selectOneProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const res = yield connect_1.client.query("SELECT * FROM products WHERE id_product = '" + id + "'");
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
                const { descric_product, val_max_product, val_min_product, fk_brand, fk_sector, bar_code } = request.body;
                const res_bar_code = yield connect_1.client.query("SELECT bar_code FROM products WHERE bar_code = '" + bar_code + "' LIMIT(1)");
                try {
                    bar_code !== res_bar_code.rows[0].bar_code;
                    response.json("Código de barras já existe");
                }
                catch (_a) {
                    yield connect_1.client.query('INSERT INTO products("descric_product", "val_max_product", "val_min_product", "fk_brand", "fk_sector", "bar_code") VALUES ('
                        + "'" + descric_product + "', '" + val_max_product + "', '" + val_min_product + "', '" + fk_brand + "', '" + fk_sector + "', '" + bar_code + "')");
                    const res = yield connect_1.client.query("SELECT descric_product FROM products WHERE descric_product = '" + descric_product + "' LIMIT(1)");
                    response.json("Registrado com sucesso: " + res.rows[0].descric_product);
                }
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const { descric_product, val_max_product, val_min_product, fk_brand, fk_sector, bar_code } = request.body;
                yield connect_1.client.query("UPDATE products SET updated_at = now(), descric_product = '" + descric_product + "', val_max_product = '"
                    + val_max_product + "', val_min_product ='" + val_min_product + "', fk_brand = '" + fk_brand + "', fk_sector = '" + fk_sector + "', bar_code = '" + bar_code + "' WHERE id_product = '" + id + "'");
                response.json("Atualizado com sucesso!");
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                yield connect_1.client.query("DELETE FROM products WHERE id_product = '" + id + "'");
                response.json("Removido com sucesso !");
            }
            catch (err) {
                response.json("Error Ocorred ! " + err);
            }
        });
    }
    ;
}
exports.ConttrollersProducts = ConttrollersProducts;
