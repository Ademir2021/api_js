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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConttrollersPaymentPagSeguro = void 0;
const fetch = require('node-fetch');
const authorization = '4D1D1C943B1B49468F2D0B00F5EE914E';
const urlPagseguroPix = 'https://sandbox.api.pagseguro.com/orders';
const urlPagseguro = 'https://sandbox.api.pagseguro.com/orders';
class ConttrollersPaymentPagSeguro {
    insertPix(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = request.body;
                let reqs = yield fetch(urlPagseguroPix, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    },
                    body: JSON.stringify(sales)
                });
                let ress = yield reqs.json();
                response.json(ress);
                console.log(ress);
                console.log(sales);
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    insertBoleto(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = request.body;
                let reqs = yield fetch(urlPagseguro, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    },
                    body: JSON.stringify(sales)
                });
                let ress = yield reqs.json();
                response.json(ress);
                console.log(ress);
                console.log(sales);
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    insertCard(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = request.body;
                let reqs = yield fetch(urlPagseguro, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': authorization,
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(sales)
                });
                let ress = yield reqs.json();
                response.json(ress);
                console.log(ress);
                // console.log(sales)
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    ;
    publicKeyPagSeguro(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let reqs = yield fetch('https://sandbox.api.pagseguro.com/public-keys', {
                    method: 'POST',
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ type: 'card' })
                });
                let ress = yield reqs.json();
                response.json(ress);
                // console.log(ress);
            }
            catch (err) {
                console.log("Error Occurred ! " + err);
            }
        });
    }
    payPagSeguro(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://sandbox.api.pagseguro.com/orders',
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: '4D1D1C943B1B49468F2D0B00F5EE914E',
                    'content-type': 'application/json'
                },
                processData: false,
                data: '{"customer":{"tax_id":"12345678909","name":"Jose da Silva","email":"email@test.com"},"charges":[{"amount":{"value":600,"currency":"BRL"},"payment_method":{"card":{"exp_month":11,"exp_year":2026,"security_code":"123","number":"4539620659922097","store":true},"type":"CREDIT_CARD","installments":1,"capture":true,"soft_descriptor":"My Store"},"reference_id":"CARD_47818C5D-3307-42FA-88AC-7F70597192D8","description":"My store"}],"reference_id":"ex-00001","items":[{"name":"nome do objeto","quantity":1,"unit_amount":500}]}'
            };
            response.json(settings);
            console.log(settings);
        });
    }
}
exports.ConttrollersPaymentPagSeguro = ConttrollersPaymentPagSeguro;
