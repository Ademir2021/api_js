import nodemailer from "nodemailer";
require('dotenv').config()
var smtpTransport = require('nodemailer-smtp-transport');

const host_email = process.env.HOST_EMAIL
const port_email = process.env.PORT_EMAIL
const user_email = process.env.USER_EMAIL
const pass_email = process.env.PASS_EMAIL

export class HandleService {
    setSendMail(name: string, email: string, phone: string, comments: string) {
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
            },
        };
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado ' + info.response);
            }
        });
    }

    setSendMailNote(note: string, email: string, phone: string, client: string, address: string) {
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
            subject: "Envio da Nota de Compra Nº " + note,
            html: "<b>Comprador:</b> " + client +
                "<br>" + "<b>Nota:</b> " + note +
                "<br>" + "<b>Email:</b> " + email +
                "<br>" + "<b>Telefone:</b> " + phone +
                "<br><br>" + "<b>Endereço:</b> " + address,
            attachments: [
                {
                    filename: 'res_note.pdf',
                    path: 'res_note.pdf'
                },
            ],
            headers: {
                'X-Laziness-level': 1000
            },
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