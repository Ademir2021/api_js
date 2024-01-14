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
}