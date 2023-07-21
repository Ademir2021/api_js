import { Request, Response } from "express";
import { TPaymentPix } from "../../Interfaces/IPagSeguro";
const fetch = require('node-fetch')
const authorization = '4D1D1C943B1B49468F2D0B00F5EE914E'
const urlPagseguro = 'https://sandbox.api.pagseguro.com/orders'

let time = new Date();
let neWData = new Date();
neWData.setHours(time.getHours() + 48);

export class ConttrollersPaymentPagSeguro {
    async insertPix(request: Request, response: Response) {
        const sales:TPaymentPix = request.body
        let reqs = await fetch(urlPagseguro, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(sales)
         });
         let ress = await reqs.json();
        response.json(ress);
        console.log(ress)
     };

    async insertBoleto(request: Request, response: Response) {
        const sale = request.body
        let reqs = await fetch(urlPagseguro, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "reference_id": sale[0].user_id,
                "description": "Motivo do pagamento",
                "amount": {
                    "value": sale[0].paySale,
                    "currency": "BRL"
                },
                "payment_method": {
                    "type": "BOLETO",
                    "boleto": {
                        "due_date": neWData,
                        "instruction_lines": {
                            "line_1": "Pagamento processado para DESC Fatura",
                            "line_2": "Via PagSeguro"
                        },
                        "holder": {
                            "name": sale[0].name_pers,
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
        let ress = await reqs.json();
        response.json(ress);
        //  response.json(ress.links[0].href)
    };
}