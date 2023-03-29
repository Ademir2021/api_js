import { Request, Response } from "express"
import { client } from "../../connect"
import { TItens } from "../../Interfaces/ISale"

export class ConttrollersSales {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (error) {
            console.log(error, "Error Occurred !!")
        }
    };

    async select(request: Request, response: Response) {
        try {
            let id = 0
            console.log("starting the search !!")
            const res_sale_ = await client.query("SELECT *FROM sales WHERE id_sale > '" + id + "'")
            const sales = res_sale_.rows
            response.json(sales);
            console.log("successful search !!")
            console.log(sales)
            const res_itens_sale = await client.query("SELECT *FROM itens_sale WHERE id_item_sequen > '" + id + "'")
            const itens_sale = res_itens_sale.rows
            console.log("successful search !!")
            console.log(itens_sale)

        } catch (error) {
            console.log(error, "Error Occurred !!")
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const itens: TItens = <TItens>request.body   
            console.log("Consulting the last sale");
            const res_num_sale = await client.query("SELECT MAX(id_sale) FROM sales;");
            let id: number = res_num_sale.rows[0].max;
            let num_sale: number = id + 1;
            console.log(num_sale);
            console.log("Entering sold items !!")
            for (let i = 1; itens.length > i; i++) {
                let sum_total_item: number = 0
                sum_total_item = itens[i].amount_product * itens[i].val_product;
                await client.query('INSERT INTO itens_sale("fk_sale", "fk_product", "amount_product", "val_product", "total_product") VALUES (' + "'" + num_sale + "', '" + itens[i].id_product + "', '" + itens[i].amount_product + "', '" + itens[i].val_product + "','" + sum_total_item + "');")
            }
            const res_itens = await client.query("SELECT * FROM itens_sale WHERE fk_sale = '" + num_sale + "'")
            console.log("Successfully inserted items !!")
            console.table(res_itens.rows)
            console.log("Entering sales")
            const res_total_itens = await client.query("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
            let sub_total_sale: number = 0
            sub_total_sale = res_total_itens.rows[0].total
            let total_sale: number = sub_total_sale - itens[0].disc_sale
            await client.query('INSERT INTO sales("fk_name_pers", "val_rec", "disc_sale", "total_sale") VALUES (' + "'" + itens[0].fk_name_pers + "', '" + sub_total_sale + "', '" + itens[0].disc_sale + "', '" + total_sale + "');");
            const res_sale = await client.query("SELECT *FROM sales WHERE id_sale = '" + num_sale + "'")
            console.table(res_sale.rows)
            response.json("Sale Register Success !!")
        } catch (error) {
            console.log(error, "Error Occurred !!")
        }
    };
}