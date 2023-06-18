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
exports.ConttrollersSales = void 0;
const connect_1 = require("../../connect");
class ConttrollersSales {
    index(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (err) {
                console.log(err, "Error Occurred !! :" + err);
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = 0;
                const res_sale_ = yield connect_1.client.query("SELECT * FROM sales");
                const sales = res_sale_.rows;
                response.send(sales);
                const res_itens_sale = yield connect_1.client.query("SELECT * FROM itens_sale");
                const itens_sale = res_itens_sale.rows;
                //response.json(itens_sale)
            }
            catch (err) {
                console.log("Error Occurred !! :" + err);
            }
        });
    }
    ;
    selectOneSale(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const res_sale_ = yield connect_1.client.query("SELECT * FROM sales WHERE id_sale = '" + id + "'");
                const sales = res_sale_.rows;
                response.send(sales);
                const res_itens_sale = yield connect_1.client.query("SELECT * FROM itens_sale WHERE id_item_sequen = '" + id + "'");
                const itens_sale = res_itens_sale.rows;
                //response.json(itens_sale)
            }
            catch (err) {
                console.log("Error Occurred !! :" + err);
            }
        });
    }
    ;
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fk_name_pers, disc_sale, filial, user_id } = request.body;
                yield connect_1.client.query('INSERT INTO sales("fk_name_pers", "disc_sale", "fk_name_filial", "fk_name_user") VALUES ('
                    + "'" + fk_name_pers +
                    "','" + disc_sale +
                    "','" + filial + "','"
                    + user_id + "')");
            }
            catch (err) {
                console.log("Error Occurred !" + err);
            }
        });
    }
    ;
    insertItens(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itens = request.body;
                const res_num_sale = yield connect_1.client.query("SELECT MAX(id_sale) FROM sales");
                const num_sale = res_num_sale.rows[0].max;
                for (let i = 0; itens.length > i; i++) {
                    const sum_total_item = itens[i].amount * itens[i].valor;
                    yield connect_1.client.query('INSERT INTO itens_sale("fk_sale", "fk_product", "amount_product", "val_product", "total_product") VALUES ('
                        + "'" + num_sale +
                        "','" + itens[i].item +
                        "','" + itens[i].amount +
                        "','" + itens[i].valor +
                        "','" + sum_total_item + "')");
                }
                const res_total_itens = yield connect_1.client.query("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
                const res_disc_sale = yield connect_1.client.query("SELECT disc_sale FROM sales WHERE id_sale = '" + num_sale + "'");
                const sub_total_sale = res_total_itens.rows[0].total;
                const total_sale = sub_total_sale - res_disc_sale.rows[0].disc_sale;
                yield connect_1.client.query("UPDATE sales SET val_rec ='" + sub_total_sale + "',  total_sale = '" + total_sale + "' WHERE id_sale = '" + num_sale + "'");
                response.json(num_sale);
            }
            catch (err) {
                console.log("Error Occurred !" + err);
            }
        });
    }
    ;
}
exports.ConttrollersSales = ConttrollersSales;