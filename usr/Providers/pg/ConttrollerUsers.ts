import { Request, Response } from "express"
import { client } from "../../connect"
import { IUser, ILogin } from "../../Interfaces/IUser"

export class ConttrollersUSers {

    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !!" + err)
        }
    };

    async login(request: Request, response: Response) {
        try {
            const { username } = request.params
            const res = await client.query("SELECT id, username, password, privilege FROM users WHERE username = '" + username + "' LIMIT(1)")
            response.json(res.rows);
        } catch (err) {
            response.json("Error Occurred !!" + err)
        }
    };

    async select(request: Request, response: Response) {
        const { id } = request.params
        try {
            const res_ = await client.query("SELECT * FROM users WHERE  id = '"+id+"'")
            if(res_.rows[0].privilege != 2 ){
                response.json(res_.rows)
            }else{
            const res = await client.query("SELECT * FROM users")
            response.json(res.rows);
            }
        } catch (err) {
            console.log("Error Occurred !!" + err)
        }
    };

    async selectOneUser(request: Request, response: Response) {
        try {
            const { id } = request.params
            const res = await client.query("SELECT * FROM users WHERE id = '" + id + "'")
            response.json(res.rows);
        } catch (err) {
            console.log("Error Occurred !!" + err)
        }
    };

    async insert(request: Request, response: Response) {
        try {
            const { name, username, password } = <IUser>request.body
            const res_username = await client.query("SELECT username FROM users WHERE username = '" + username + "' LIMIT(1);")
            try {
                username !== res_username.rows[0].username
                response.json("Email já cadastrado: " + username)
            } catch {
                await client.query('INSERT INTO users(name, username, password) VALUES (' + "'" + name + "', '" + username + "', '" + password + "');")
                const res_name = await client.query("SELECT name FROM users WHERE name = '" + name + "' LIMIT(1)")
                response.json("Registrado com successo: " + res_name.rows[0].name)
            }
        } catch (err) {
            response.json("Error Occurred !" + err)
        }
    };

    async update(request: Request, response: Response) {
        try {
            const id = request.params.id
            const { name, username, password }: IUser = <IUser>request.body
            await client.query("UPDATE users SET updated_at = now(), name = '" + name + "', username = '" + username + "', password = '" + password + "' WHERE id = '" + id + "'")
            response.json("Atualizado com sucesso !")
        } catch (err) {
            response.json("Error Ocorred !!: " + err)
        }
    };
    
    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id
            await client.query("DELETE FROM users WHERE id = '" + id + "'")
            response.json("Removido com sucesso")
        } catch (err) {
            console.log("Error Ocorred: " + err)
        }
    };
}

