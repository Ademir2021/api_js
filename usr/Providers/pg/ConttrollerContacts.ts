import { Request, Response } from "express"
import { client } from "../../connect"
import nodemailer from "nodemailer";
// var smtpTransport = require('nodemailer-smtp-transport');

type TContact = {
    name: string;
    email: string;
    phone: string;
    comments: string;
}

async function sendMail(name: string, email: string, phone: string, comments: string) {
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: "ademir_gre@hotmail.com",
            pass: "873700xla"
        },
        // tls: {
        //     ciphers: 'SSLv3',
        // },
    });
    await transporter.sendMail({
        from: "ademir_gre@hotmail.com",
        to: "ademir_gre@hotmail.com",
        cc: "centroserra@gmail.com," + email,
        subject: "Contato: centroinfo.com.br",
        html: "<b>Novo contato:</b>"
        + "<br><b>Cliente</b> " + name
        + "<br><b>Telefone:</b> " + phone
        + "<br><b>Email:</b> " + email
        + "<br><b>Assunto:</b> " + comments
        + "<br><br><b>Agradecemos pelo seu contato, em breve estaremos em contato!</b>"
        + "<br><br><b>Atentamente:</b> Ademir Souza de Almeida"
    }).then((message: any) => {
        // console.log(message)
    }).catch((err: any) => {
        // console.log(err)
    })
}
 
export class ConttrollersContacts {
    async index(request: Request, response: Response) {
        try {
            response.status(200).json({ status: 'sucesss' })
        } catch (err) {
            console.log("Error Occurred !!" + err)
        }
    };

    async select(request: Request, response: Response) {
        const { user_id } = request.params
        try {
            const res_ = await client.query("SELECT * FROM users WHERE  id = '" + user_id + "'")
            if (res_.rows[0].privilege != 2) {
                response.json(null)
            } else {
                const res = await client.query("SELECT * FROM contacts ")
                response.json(res.rows);
            }
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insert(request: Request, response: Response) {
        const { name, email, phone, comments } = <TContact>request.body
        try {
            sendMail(name, email, phone, comments)
            await client.query('INSERT INTO contacts(name, email, phone, comments) VALUES (' + "'" + name + "', '" + email + "', '" + phone + "', '" + comments + "');")
            const res_name = await client.query("SELECT name FROM contacts WHERE name = '" + name + "' LIMIT(1)")
            response.json(res_name.rows[0].name + ' Seu contato foi registrado com sucesso !')
        } catch (err) {
            response.json("Error Occurred !" + err)
        }
    }
}