"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
var smtpTransport = require('nodemailer-smtp-transport');
const user_email = process.env.USER_EMAIL;
const pass_email = process.env.PASS_EMAIL;
class HandleService {
    setSendMail(name, email, phone, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            // let transporter = nodemailer.createTransport({
            //     name: 'no-reply@outlook.com',
            //     service: "hotmail",
            //     host: "smtp-mail.outlook.com",
            //     port: 25,
            //     // secure: false,
            //     auth: {
            //         user: user_email,
            //         pass: pass_email
            //     },
            // });
            // await transporter.sendMail({
            //     from: "Ademir <ademir_gre@hotmail.com>",
            //     to:"ademir_gre@hotmail.com",
            //     cc:"centroserra@gmail.com," + email,
            //     subject: "Contato: centroinfo.com.br",
            //     // text:"Assunto; " + comments,
            //     html:"<br><b>Sua mensagem para:</b> <a>centroinfo.com.br </a><br><br>"
            //     + comments
            // }).then((message: any) => {
            //     console.log(message)
            // }).catch((err: any) => {
            //     console.log(err)
            // })
            const smtpConfig = smtpTransport({
                port: process.env.PORT || 587,
                host: "smtp-mail.outlook.com",
                // ignoreTLS: false,
                secure: false,
                tls: {
                    rejectUnauthorized: true
                },
                auth: {
                    user: user_email,
                    pass: pass_email
                }
            });
            const transporter = nodemailer_1.default.createTransport(smtpConfig);
            const message = {
                from: "Ademir <ademir_gre@hotmail.com>",
                to: user_email,
                subject: "Assunto do Email",
                text: "Conteúdo do email em texto",
                html: "<h1>Conteúdo do email em HTML</h1>",
                headers: {
                    'X-Laziness-level': 1000
                }
            };
            transporter.sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email enviado ' + info.response);
                }
            });
        });
    }
}
exports.HandleService = HandleService;
