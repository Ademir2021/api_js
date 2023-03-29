import { Request, Response } from "express"
import { client } from "../../connect"
import { IProduct } from "../../Interfaces/IProduct"

export class ConttrollersProducts {
    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (ex) {
            console.log("Error Occurred !!")
        }
    };

    async select(request: Request, response: Response) {
        try {
            let id = 0
            const res = await client.query("SELECT * FROM products WHERE id_product > '" + id + "'")
            response.json(res.rows);
        } catch (err) {
            console.log(err)
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const { name, val_max, val_min, brand, sector, bar_code }: IProduct = <IProduct>request.body
            const res_bar_code = await client.query("SELECT bar_code FROM products WHERE bar_code = '" + bar_code + "' LIMIT(1)")
            try {
                bar_code !== res_bar_code.rows[0].bar_code
                response.json("Barras já existe")
            } catch {
                await client.query('INSERT INTO products("descric_product", "val_max_product", "val_min_product", "fk_brand", "fk_sector", "bar_code") VALUES (' + "'" + name + "', '" + val_max + "', '" + val_min + "', '" + brand + "', '" + sector + "', '" + bar_code + "');")
                const res = await client.query("SELECT descric_product FROM products WHERE descric_product = '" + name + "' LIMIT(1)")
                response.json("Produto registrado: " + res.rows[0].descric_product)
            }
        } catch (err) {
            console.log(err)
        }
    };

    async update(request: Request, response: Response) {
        try {
            /** */
        } catch (ex) {
            console.log("Erro Ocorred")
        }
    };

    async delete(request: Request, response: Response) {
        try {
            /** */
        } catch (ex) {
            console.log("Erro Ocorred")
        }
    };
}