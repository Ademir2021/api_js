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
const urlPagseguro = 'https://sandbox.api.pagseguro.com/orders';
class ConttrollersPaymentPagSeguro {
    insertPix(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let res_payment_pix = request.body;
            res_payment_pix = "Nada para Postar";
            response.json(res_payment_pix);
        });
    }
    ;
    selectPix(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const res_payment_pix = request.body;
            console.log(res_payment_pix);
            let id = '1';
            let reqs = yield fetch(urlPagseguro, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify({
                    "reference_id": id,
                    "customer": {
                        "name": "Jose da Silva",
                        "email": "email@test.com",
                        "tax_id": "12345678909",
                        "phones": [
                            {
                                "country": "55",
                                "area": "11",
                                "number": "999999999",
                                "type": "MOBILE"
                            }
                        ]
                    },
                    "items": [
                        {
                            "name": "nome do item",
                            "quantity": 1,
                            "unit_amount": 500
                        }
                    ],
                    "qr_codes": [
                        {
                            "amount": {
                                "value": 500
                            },
                            "expiration_date": "2023-08-29T20:15:59-03:00",
                        }
                    ],
                    "shipping": {
                        "address": {
                            "street": "Avenida Brigadeiro Faria Lima",
                            "number": "1384",
                            "complement": "apto 12",
                            "locality": "Pinheiros",
                            "city": "São Paulo",
                            "region_code": "SP",
                            "country": "BRA",
                            "postal_code": "01452002"
                        }
                    },
                    "notification_urls": [
                        "https://meusite.com/notificacoes"
                    ]
                })
            });
            let ress = yield reqs.json();
            response.json(ress);
        });
    }
    ;
    selectBoleto(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqs = yield fetch(urlPagseguro, {
                method: 'POST',
                headers: {
                    'Authorization': authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "reference_id": "ex-00001",
                    "description": "Motivo do pagamento",
                    "amount": {
                        "value": 100035,
                        "currency": "BRL"
                    },
                    "payment_method": {
                        "type": "BOLETO",
                        "boleto": {
                            "due_date": "2024-12-31",
                            "instruction_lines": {
                                "line_1": "Pagamento processado para DESC Fatura",
                                "line_2": "Via PagSeguro"
                            },
                            "holder": {
                                "name": "Jose da Silva",
                                "tax_id": "22222222222",
                                "email": "jose@email.com",
                                "address": {
                                    "street": "Avenida Brigadeiro Faria Lima",
                                    "number": "1384",
                                    "locality": "Pinheiros",
                                    "city": "Sao Paulo",
                                    "region": "Sao Paulo",
                                    "region_code": "SP",
                                    "country": "Brasil",
                                    "postal_code": "01452002"
                                }
                            }
                        }
                    },
                    "notification_urls": [
                        "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/"
                    ]
                })
            });
            let ress = yield reqs.json();
            response.json(ress);
            //  response.json(ress.links[0].href)
        });
    }
    ;
}
exports.ConttrollersPaymentPagSeguro = ConttrollersPaymentPagSeguro;
