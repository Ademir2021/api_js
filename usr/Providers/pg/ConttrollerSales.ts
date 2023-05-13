import { Request, Response } from "express"
import { client } from "../../connect"
import { TItens } from "../../Interfaces/ISale"

export class ConttrollersSales {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log(err, "Error Occurred !! :" + err)
        }
    };
    async select(request: Request, response: Response) {
        try {
            let id = 0
            console.log("starting the search !!")
            const res_sale_ = await client.query("SELECT *FROM sales WHERE id_sale > '" + id + "'")
            const sales = res_sale_.rows
            response.json(sales);
            const res_itens_sale = await client.query("SELECT *FROM itens_sale WHERE id_item_sequen > '" + id + "'")
            const itens_sale = res_itens_sale.rows
            console.log(itens_sale)
        } catch (err) {
            console.log("Error Occurred !! :" + err)
        }
    };
    async insert(request: Request, response: Response) {
        try {
            const itens: TItens[] = <TItens[]>request.body
            const res_num_sale = await client.query
                ("SELECT MAX(id_sale) FROM sales");
            const num_sale: number = res_num_sale.rows[0].max + 1;
            for (let i = 1; itens.length > i; i++) {
                const sum_total_item: number = itens[i].amount_product * itens[i].val_product;
                await client.query
                    ('INSERT INTO itens_sale("fk_sale", "fk_product", "amount_product", "val_product", "total_product") VALUES ('
                        + "'"
                        + num_sale
                        + "','"
                        + itens[i].id_product
                        + "','"
                        + itens[i].amount_product
                        + "','"
                        + itens[i].val_product
                        + "','"
                        + sum_total_item
                        + "')")
            }
            const res_total_itens = await client.query
                ("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
            const sub_total_sale: number = res_total_itens.rows[0].total
            const total_sale: number = sub_total_sale - itens[0].disc_sale
            await client.query
                ('INSERT INTO sales("fk_name_pers", "val_rec", "disc_sale", "total_sale", fk_name_filial, fk_name_user) VALUES ('
                    + "'"
                    + itens[0].fk_name_pers
                    + "','"
                    + sub_total_sale
                    + "','"
                    + itens[0].disc_sale
                    + "','"
                    + total_sale
                    + "','"
                    + itens[0].filial
                    + "','"
                    + itens[0].user_id
                    + "')")
            response.json(num_sale)
        } catch (err) {
            console.log("Error Occurred !! :" + err)
        }
    };
}