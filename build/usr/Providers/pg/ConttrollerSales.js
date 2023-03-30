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
            catch (error) {
                console.log(error, "Error Occurred !!");
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = 0;
                console.log("starting the search !!");
                const res_sale_ = yield connect_1.client.query("SELECT *FROM sales WHERE id_sale > '" + id + "'");
                const sales = res_sale_.rows;
                response.json(sales);
                console.log("successful search !!");
                console.log(sales);
                const res_itens_sale = yield connect_1.client.query("SELECT *FROM itens_sale WHERE id_item_sequen > '" + id + "'");
                const itens_sale = res_itens_sale.rows;
                console.log("successful search !!");
                console.log(itens_sale);
            }
            catch (err) {
                console.log("Error Occurred!! :" + err);
            }
        });
    }
    ;
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itens = request.body;
                console.log("Consulting the last sale");
                const res_num_sale = yield connect_1.client.query("SELECT MAX(id_sale) FROM sales;");
                let id = res_num_sale.rows[0].max;
                let num_sale = id + 1;
                console.log(num_sale);
                console.log("Entering sold items !!");
                for (let i = 1; itens.length > i; i++) {
                    let sum_total_item = 0;
                    sum_total_item = itens[i].amount_product * itens[i].val_product;
                    yield connect_1.client.query('INSERT INTO itens_sale("fk_sale", "fk_product", "amount_product", "val_product", "total_product") VALUES (' + "'" + num_sale + "', '" + itens[i].id_product + "', '" + itens[i].amount_product + "', '" + itens[i].val_product + "','" + sum_total_item + "');");
                }
                const res_itens = yield connect_1.client.query("SELECT * FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
                console.log("Successfully inserted items !!");
                console.table(res_itens.rows);
                console.log("Entering sales");
                const res_total_itens = yield connect_1.client.query("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
                let sub_total_sale = 0;
                sub_total_sale = res_total_itens.rows[0].total;
                let total_sale = sub_total_sale - itens[0].disc_sale;
                yield connect_1.client.query('INSERT INTO sales("fk_name_pers", "val_rec", "disc_sale", "total_sale") VALUES (' + "'" + itens[0].fk_name_pers + "', '" + sub_total_sale + "', '" + itens[0].disc_sale + "', '" + total_sale + "');");
                const res_sale = yield connect_1.client.query("SELECT *FROM sales WHERE id_sale = '" + num_sale + "'");
                console.table(res_sale.rows);
                response.json("Sale Register Success !!");
            }
            catch (error) {
                console.log(error, "Error Occurred !!");
            }
        });
    }
    ;
}
exports.ConttrollersSales = ConttrollersSales;
