import { Request, Response } from "express"
import { client } from "../../connect"
import { IPerson } from "../../Interfaces/IPerson"

export class ConttrollersPersons {
    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !!: " + err)
        }
    };
    async select(request: Request, response: Response) {
        try {
            let id = 0
            const res = await client.query("SELECT * FROM persons WHERE id_person > '" + id + "'")
            response.json(res.rows);
        } catch (err) {
            console.log("Error Occurred !!: " + err)
        }
    };
    async insert(request: Request, response: Response) {
        try {
            const { ...rest }: IPerson = <IPerson>request.body
            const res_cpf = await client.query("SELECT cpf_pers FROM persons WHERE cpf_pers = '" + rest.cpf_pers + "' LIMIT(1)")
            try {
                rest.cpf_pers !== res_cpf.rows[0].cpf_pers
                response.json("CPF pertence a outra Pessoa !! :" + rest.cpf_pers)
            } catch {
                await client.query('INSERT INTO persons("name_pers", "cpf_pers", "address_pers", "fk_name_filial") VALUES (' + "'" + rest.name_pers + "', '" + rest.cpf_pers + "', '" + rest.address_pers + "', '" + rest.fk_name_filial + "');")
                const res = await client.query("SELECT name_pers FROM persons WHERE name_pers = '" + rest.name_pers + "' LIMIT(1)")
                response.json("Pessoa registrada: " + res.rows[0].name_pers)
            }
        } catch (err) {
            console.log("Error Occurred !!: " + err)
        }
    };
    async update(request: Request, response: Response) {
        try {
            const id = request.params.id
            const { ...rest }: IPerson = <IPerson>request.body
            await client.query("UPDATE persons SET name_pers = '" + rest.name_pers + "', cpf_pers = '" + rest.cpf_pers + "', address_pers ='" + rest.address_pers + "', fk_name_filial = '" + rest.fk_name_filial + "' WHERE id_person = '" + id + "'")
            response.json("Update com sucess !!")
        } catch (err) {
            console.log("Erro Ocorred", err)
        }
    };
    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id
            await client.query("DELETE FROM persons WHERE id_person = '" + id + "'")
            response.json("Produto removido da tabela")
        } catch (err) {
            response.json("Error Ocorred !!" + err)
        }
    };
}