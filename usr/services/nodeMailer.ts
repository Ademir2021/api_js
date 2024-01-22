import nodemailer from "nodemailer";
require('dotenv').config()
var smtpTransport = require('nodemailer-smtp-transport');

const host_email = process.env.HOST_EMAIL
const port_email = process.env.PORT_EMAIL
const user_email = process.env.USER_EMAIL
const pass_email = process.env.PASS_EMAIL

export class HandleService {
    async setSendMail(name: string, email: string, phone: string, comments: string) {
        const smtpConfig = smtpTransport({
            service: "gmail",
            host: host_email,
            port: port_email,
            secure: true,
            auth: {
                user: user_email,
                pass: pass_email
            }
        });
        const transporter = nodemailer.createTransport(smtpConfig);
        const message: any = {
            from: "Centro Informática<centroserra@gmail.com>",
            to: "centroserra@gmail.com," + email,
            subject: "Contato do Formulário on-line de clientes",
            html: "<b>Mensagem de:</b> " +
                "<br>" + "<b>Cliente:</b> " + name +
                "<br>" + "<b>Email:</b> " + email +
                "<br>" + "<b>Telefone:</b> " + phone +
                "<br><br>" + "<b>Assunto:</b> " + comments,
            headers: {
                'X-Laziness-level': 1000
            }
        };
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado ' + info.response);
            }
        });
    }
}