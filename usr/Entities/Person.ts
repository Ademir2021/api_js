import { Request, Response } from "express"
import { client } from "../connect"

export class Person {
    private _id: number;
    private _name: string;
    private _cpf: string;
    private _address: string;
    private _name_filial: number;
    constructor(id: number, name: string, cpf: string, address: string, name_filial: number) {
        this._id = id;
        this._name = name;
        this._cpf = cpf;
        this._address = address;
        this._name_filial = name_filial
    };
    public async insert(response: Response, request: Request) {
        try {
            await client.connect()
            await client.query('INSERT INTO persons("name_pers","cpf_pers","address_pers","fk_name_filial") VALUES (' + "'" + this._name + "', '" + this._cpf + "', '" + this._address + "', '" + this._name_filial + "');")
            const res = await client.query("SELECT *FROM persons")
            response.json(res.rows)
        }
        catch (err) {
            response.json("Ocorreu um erro !! Erro: " + err)
        }
        finally {
            await client.end()
            response.json("Cliente desconectado !!")
        }
    };

}