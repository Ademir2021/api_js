import { Request, Response } from "express"
import { client } from "../../connect"
import { TSale } from "../../Interfaces/ISale"

export class ConttrollersSales {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log(err, "Error Occurred ! " + err)
        }
    };

    async select(request: Request, response: Response) {
        try {
            let id = 0
            const res_sale_ = await client.query("SELECT * FROM sales ORDER BY id_sale")
            const sales = res_sale_.rows
            response.send(sales);
            const res_itens_sale = await client.query("SELECT * FROM itens_sale")
            const itens_sale = res_itens_sale.rows
            // console.table(itens_sale)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async selectOneSale(request: Request, response: Response) {
        try {
            const { id } = request.params
            const res_sale_ = await client.query("SELECT * FROM sales WHERE id_sale = '" + id + "'")
            const sales = res_sale_.rows
            response.send(sales);
            const res_itens_sale = await client.query("SELECT * FROM itens_sale WHERE fk_sale = '" + id + "'")
            const itens_sale = res_itens_sale.rows
            for(let i = 0; itens_sale.length > i; i++)(
            console.log(itens_sale[i])
            )
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const itens: TSale[] = <TSale[]>request.body
            await client.query
                ('INSERT INTO sales("fk_name_pers", "disc_sale", "fk_name_filial", "fk_name_user") VALUES ('
                    + "'"
                    + itens[0].fk_name_pers
                    + "','"
                    + itens[0].disc_sale
                    + "','"
                    + itens[0].filial
                    + "','"
                    + itens[0].user_id
                    + "')")
            const res_num_sale = await client.query
                ("SELECT MAX(id_sale) FROM sales");
            const num_sale: number = res_num_sale.rows[0].max;
            for (let i = 1; itens.length > i; i++) {
                // const sum_total_item: number = itens[i].amount * itens[i].valor;
                const sum_total_item: number = 0;
                await client.query
                    ('INSERT INTO itens_sale("fk_sale", "fk_product", "amount_product", "val_product", "total_product") VALUES ('
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
                        + "')")
            }
            // const res_total_itens = await client.query
            //     ("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
            // const sub_total_sale: number = res_total_itens.rows[0].total
            // const total_sale: number = sub_total_sale - itens[0].disc_sale
            // await client.query
            //     ("UPDATE sales SET val_rec ='" + sub_total_sale + "',  total_sale = '" + total_sale + "' WHERE id_sale = '"+num_sale+"'")
            response.json("Nota Nº:" + num_sale + " inserida com sucesso !");
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };
}