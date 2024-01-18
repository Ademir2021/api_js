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
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (err) {
                console.log(err, "Error Occurred ! " + err);
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
                    const res_sale_ = yield connect_1.client.query("SELECT * FROM sales WHERE fk_name_user = '" + user_id + "' ORDER BY id_sale");
                    const sales = res_sale_.rows;
                    response.send(sales);
                }
                else {
                    const res_sale_ = yield connect_1.client.query("SELECT * FROM sales  ORDER BY id_sale");
                    const sales = res_sale_.rows;
                    response.send(sales);
                }
                const res_itens_sale = yield connect_1.client.query("SELECT * FROM itens_sale");
                const itens_sale = res_itens_sale.rows;
                // console.table(itens_sale)
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
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
                const res_itens_sale = yield connect_1.client.query("SELECT * FROM itens_sale WHERE fk_sale = '" + id + "'");
                const itens_sale = res_itens_sale.rows;
                for (let i = 0; itens_sale.length > i; i++)
                    (console.log(itens_sale[i]));
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
                const itens = request.body;
                yield connect_1.client.query('INSERT INTO sales(fk_name_pers, disc_sale, fk_name_filial, fk_name_user) VALUES ('
                    + "'"
                    + itens[0].fk_name_pers
                    + "','"
                    + itens[0].disc_sale
                    + "','"
                    + itens[0].filial
                    + "','"
                    + itens[0].user_id
                    + "')");
                const res_num_sale = yield connect_1.client.query("SELECT MAX(id_sale) FROM sales");
                const num_sale = res_num_sale.rows[0].max;
                for (let i = 1; itens.length > i; i++) {
                    // const sum_total_item: number = itens[i].amount * itens[i].valor;
                    const sum_total_item = 0;
                    yield connect_1.client.query('INSERT INTO itens_sale(fk_sale, fk_product, amount_product, val_product, total_product) VALUES ('
                        + "'"
                        + num_sale
                        + "','"
                        + itens[i].item
                        + "','"
                        + itens[i].amount
                        + "','"
                        + itens[i].valor
                        + "','"
                        + sum_total_item
                        + "')");
                }
                // const res_total_itens = await client.query
                //     ("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
                // const sub_total_sale: number = res_total_itens.rows[0].total
                // const total_sale: number = sub_total_sale - itens[0].disc_sale
                // await client.query
                //     ("UPDATE sales SET val_rec ='" + sub_total_sale + "',  total_sale = '" + total_sale + "' WHERE id_sale = '"+num_sale+"'")
                response.json("Nota Nº:" + num_sale + " inserida com sucesso !");
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
}
exports.ConttrollersSales = ConttrollersSales;
