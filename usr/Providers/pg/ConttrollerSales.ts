import { Request, Response } from "express"
import { client } from "../../connect"
import { TSale, TItens } from "../../Interfaces/ISale"

export class ConttrollersSales {
    async index(response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log(err, "Error Occurred !! :" + err)
        }
    };

    async select(response: Response) {
        try {
            let id = 0
            const res_sale_ = await client.query("SELECT * FROM sales")
            const sales = res_sale_.rows
            response.send(sales);
            const res_itens_sale = await client.query("SELECT * FROM itens_sale")
            const itens_sale = res_itens_sale.rows
            //response.json(itens_sale)
        } catch (err) {
            console.log("Error Occurred !! :" + err)
        }
    };

    async selectOneSale(request: Request, response: Response) {
        try {
            const { id } = request.params
            const res_sale_ = await client.query("SELECT * FROM sales WHERE id_sale = '" + id + "'")
            const sales = res_sale_.rows
            response.send(sales);
            const res_itens_sale = await client.query("SELECT * FROM itens_sale WHERE id_item_sequen = '" + id + "'")
            const itens_sale = res_itens_sale.rows
            //response.json(itens_sale)
        } catch (err) {
            console.log("Error Occurred !! :" + err)
        }
    };

    async insert(request: Request) {
        try {
            const { fk_name_pers, disc_sale, filial, user_id }: TSale = <TSale>request.body
            await client.query('INSERT INTO sales("fk_name_pers", "disc_sale", "fk_name_filial", "fk_name_user") VALUES ('
            + "'" + fk_name_pers +
            "','" + disc_sale +
            "','" + filial + "','"
            + user_id + "')")
        } catch (err) {
            console.log("Error Occurred !" + err)
        }
    };

    async insertItens(request: Request, response: Response) {
        try {
            const itens: TItens[] = <TItens[]>request.body
            const res_num_sale = await client.query("SELECT MAX(id_sale) FROM sales");
            const num_sale: number = res_num_sale.rows[0].max;
            for (let i = 0; itens.length > i; i++) {
                const sum_total_item: number = itens[i].amount * itens[i].valor;
                 await client.query('INSERT INTO itens_sale("fk_sale", "fk_product", "amount_product", "val_product", "total_product") VALUES ('
                 + "'" + num_sale +
                 "','" + itens[i].item +
                 "','" + itens[i].amount +
                 "','" + itens[i].valor +
                 "','" + sum_total_item + "')")
            }
            const res_total_itens = await client.query("SELECT SUM (total_product) AS total FROM itens_sale WHERE fk_sale = '" + num_sale + "'");
            const res_disc_sale = await client.query("SELECT disc_sale FROM sales WHERE id_sale = '" + num_sale + "'")
            const sub_total_sale: number = res_total_itens.rows[0].total
            const total_sale: number = sub_total_sale - res_disc_sale.rows[0].disc_sale
             await client.query("UPDATE sales SET val_rec ='" + sub_total_sale + "',  total_sale = '" + total_sale + "' WHERE id_sale = '" + num_sale + "'")
            response.json(num_sale)
        } catch (err) {
            console.log("Error Occurred !" + err)
        }
    };

}