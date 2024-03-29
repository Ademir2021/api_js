import { Request, Response } from "express"
import { client } from "../../connect"
import { IPerson } from "../../Interfaces/IPerson"

export class ConttrollersPersons {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async select(request: Request, response: Response) {
        const { user_id } = request.params
        try {
            const res_ = await client.query("SELECT * FROM users WHERE  id = '" + user_id + "'")
            if (res_.rows[0].privilege != 2) {
                const res = await client.query("SELECT * FROM persons where fk_id_user = '" + user_id + "'")
                response.json(res.rows);
            } else {
                const res = await client.query("SELECT * FROM persons")
                response.json(res.rows);
            }
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async selectOne(request: Request, response: Response) {
        try {
            const { id } = request.params
            const res = await client.query("SELECT * FROM persons WHERE id_person = '" + id + "'")
            response.json(res.rows);
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async selectOneUser(request: Request, response: Response) {
        try {
            const { user_id } = request.params
            const res = await client.query("SELECT * FROM persons WHERE fk_id_user = '" + user_id + "'")
            response.json(res.rows);
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const person: IPerson = <IPerson>request.body
            const res_cpf = await client.query("SELECT cpf_pers FROM persons WHERE cpf_pers = '" + person.cpf_pers + "' LIMIT(1)")
            try {
                person.cpf_pers !== res_cpf.rows[0].cpf_pers
                response.json("CPF pertence a outra Pessoa ! " + person.cpf_pers)
            } catch {
                await client.query('INSERT INTO persons(name_pers, cpf_pers, phone_pers, address_pers, fk_name_filial, fk_id_user, bairro_pers, fk_cep) VALUES (' + "'" + person.name_pers + "', '" + person.cpf_pers + "', '" + person.phone_pers + "', '" + person.address_pers + "', '" + person.fk_name_filial + "', '" + person.fk_id_user + "', '"+person.bairro_pers+"', '"+person.fk_cep+"');")
                const res = await client.query("SELECT name_pers FROM persons WHERE name_pers = '" + person.name_pers + "' LIMIT(1)")
                response.json("Registrado com sucesso: " + res.rows[0].name_pers)
            }
        } catch (err) {
            console.log("Error Occurred !!: " + err)
        }
    };
    async update(request: Request, response: Response) {
        try {
            const id = request.params.id
            const person: IPerson = <IPerson>request.body
            await client.query("UPDATE persons SET updated_at =  now(), name_pers = '" + person.name_pers + "', cpf_pers = '" + person.cpf_pers + "', phone_pers ='" + person.phone_pers + "', address_pers ='" + person.address_pers + "', bairro_pers = '" + person.bairro_pers + "', fk_cep = '" + person.fk_cep + "', fk_name_filial = '" + person.fk_name_filial + "' WHERE id_person = '" + id + "'")
            response.json("Cliente atualizado com sucesso ! ")
        } catch (err) {
            response.json("Error Occurred ! " + err)
        }
    };
    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id
            await client.query("DELETE FROM persons WHERE id_person = '" + id + "'")
            response.json("Removido com sucesso !")
        } catch (err) {
            response.json("Error Ocorred ! " + err)
        }
    };
}