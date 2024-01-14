import { Request, Response } from "express"
import { client } from "../../connect"

type TContact = {
    name: string;
    email: string;
    phone: string;
    comments: string;
}

export class ConttrollersContacts {
    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !!" + err)
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const { name, email, phone, comments } = <TContact>request.body
                await client.query('INSERT INTO contacts(name, email, phone, comments) VALUES (' + "'" + name + "', '" + email + "', '" + phone + "', '"+comments+"');")
                const res_name = await client.query("SELECT name FROM contacts WHERE name = '" + name + "' LIMIT(1)")
                response.json(res_name.rows[0].name + ' seu contato foi registrado com sucesso !')       
        } catch (err) {
            response.json("Error Occurred !" + err)
        }
    };
}