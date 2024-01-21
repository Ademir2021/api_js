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
exports.ConttrollersContacts = void 0;
const connect_1 = require("../../connect");
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
const user_email = process.env.USER_EMAIL;
const pass_email = process.env.PASS_EMAIL;
function sendMail(name, email, phone, comments) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            service: "hotmail",
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: user_email,
                pass: pass_email
            },
            // tls: {
            //     ciphers: 'SSLv3',
            // },
            ignoreTLS: true,
        });
        yield transporter.sendMail({
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
        }).then((message) => {
            console.log(message);
        }).catch((err) => {
            console.log(err);
        });
    });
}
class ConttrollersContacts {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(200).json({ status: 'sucesss' });
            }
            catch (err) {
                console.log("Error Occurred !!" + err);
            }
        });
    }
    ;
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = request.params;
            try {
                const res_ = yield connect_1.client.query("SELECT * FROM users WHERE  id = '" + user_id + "'");
                if (res_.rows[0].privilege != 2) {
                    response.json(null);
                }
                else {
                    const res = yield connect_1.client.query("SELECT * FROM contacts ");
                    response.json(res.rows);
                }
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    insert(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, comments } = request.body;
            try {
                sendMail(name, email, phone, comments);
                yield connect_1.client.query('INSERT INTO contacts(name, email, phone, comments) VALUES (' + "'" + name + "', '" + email + "', '" + phone + "', '" + comments + "');");
                const res_name = yield connect_1.client.query("SELECT name FROM contacts WHERE name = '" + name + "' LIMIT(1)");
                response.json(res_name.rows[0].name + ' Seu contato foi registrado com sucesso !');
            }
            catch (err) {
                response.json("Error Occurred !" + err);
            }
        });
    }
}
exports.ConttrollersContacts = ConttrollersContacts;
