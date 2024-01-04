import { Request, Response } from "express"
import { client } from "../../connect"
import { IProduct } from "../../Interfaces/IProduct"

export class ConttrollersProducts {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !" + err)
        }
    };
    
    async selectHome(request: Request, response: Response) {
        try {
            const res = await client.query("SELECT * FROM products ORDER BY descric_product");
            response.json(res.rows);

        } catch (err) {
            console.log("Error Ocurred ! " + err)
        }
    };

    async select(request: Request, response: Response) {
        const { user_id } = request.params
        try {
            const res_ = await client.query("SELECT * FROM users WHERE  id = '" + user_id + "'")
            if (res_.rows[0].privilege === '2') {
                const res = await client.query("SELECT * FROM products ORDER BY id_product")
                response.json(res.rows);
            }
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async selectOneProduct(request: Request, response: Response) {
        try {
            const { id } = request.params
            const res = await client.query("SELECT * FROM products WHERE id_product = '" + id + "'")
            response.json(res.rows);
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const { descric_product, val_max_product, val_min_product, fk_brand, fk_sector, bar_code, image }: IProduct = <IProduct>request.body
            const res_bar_code = await client.query("SELECT bar_code FROM products WHERE bar_code = '" + bar_code + "' LIMIT(1)")
            try {
                bar_code !== res_bar_code.rows[0].bar_code
                response.json("Código de barras já existe")
            } catch {
                await client.query('INSERT INTO products("descric_product", "val_max_product", "val_min_product", "fk_brand", "fk_sector", "bar_code", "image") VALUES ('
                    + "'" + descric_product + "', '" + val_max_product + "', '" + val_min_product + "', '" + fk_brand + "', '" + fk_sector + "', '" + bar_code + "', '" + image + "')")
                const res = await client.query("SELECT descric_product FROM products WHERE descric_product = '" + descric_product + "' LIMIT(1)")
                response.json("Registrado com sucesso: " + res.rows[0].descric_product)
            }
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async update(request: Request, response: Response) {
        try {
            const id = request.params.id
            const { descric_product, val_max_product, val_min_product, fk_brand, fk_sector, bar_code, image }: IProduct = <IProduct>request.body
            await client.query("UPDATE products SET updated_at = now(), descric_product = '" + descric_product + "', val_max_product = '"
                + val_max_product + "', val_min_product ='" + val_min_product + "', fk_brand = '" + fk_brand + "', fk_sector = '" + fk_sector + "', bar_code = '" + bar_code + "', image = '" + image + "' WHERE id_product = '" + id + "'")
            response.json("Atualizado com sucesso!")
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id
            await client.query("DELETE FROM products WHERE id_product = '" + id + "'")
            response.json("Removido com sucesso !")
        } catch (err) {
            response.json("Error Ocorred ! " + err)
        }
    };
}