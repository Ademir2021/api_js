import { Request, Response } from "express"
import { client } from "../../connect"

export class ConttrollerCities {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !" + err)
        }
    };

    async select(request: Request, response: Response) {
        try {
            const res = await client.query("SELECT * FROM cities");
            response.json(res.rows);

        } catch (err) {
            console.log("Error Ocurred ! " + err)
        }
    }

    async selectOnCity(request: Request, response: Response) {
        try {
            const { id } = request.params 
            const res = await client.query("SELECT name_city FROM cities WHERE id_city = '" + id + "' LIMIT(1)")
            response.json(res.rows[0]);
        } catch (err) {
            response.json("Error Occurred !!" + err)
        }
    };

}