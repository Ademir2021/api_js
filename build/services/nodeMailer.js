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
const host_email = process.env.HOST_EMAIL;
const port_email = process.env.PORT_EMAIL;
const user_email = process.env.USER_EMAIL;
const pass_email = process.env.PASS_EMAIL;
class HandleService {
    setSendMail(name, email, phone, comments) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const transporter = nodemailer_1.default.createTransport(smtpConfig);
            const message = {
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
                }
                else {
                    console.log('Email enviado ' + info.response);
                }
            });
        });
    }
}
exports.HandleService = HandleService;
