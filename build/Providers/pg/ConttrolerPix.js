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
exports.ConttrollersPix = void 0;
const fetch = require('node-fetch');
class ConttrollersPix {
    select(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqs = yield fetch('https://sandbox.api.pagseguro.com/orders', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '4D1D1C943B1B49468F2D0B00F5EE914E'
                },
                body: JSON.stringify({
                    "reference_id": "ex-00001",
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
            // console.log(ress.qr_codes[0].links[0].href);
            response.redirect(ress.qr_codes[0].links[0].href);
        });
    }
    ;
}
exports.ConttrollersPix = ConttrollersPix;
