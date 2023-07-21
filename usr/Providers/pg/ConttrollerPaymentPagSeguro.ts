import { Request, Response } from "express";
import { TPaymentPix, TPaymentPagSeguroBoleto, TPaymentPagSeguroCard } from "../../Interfaces/IPagSeguro";
const fetch = require('node-fetch')
const authorization = '4D1D1C943B1B49468F2D0B00F5EE914E'
const urlPagseguro = 'https://sandbox.api.pagseguro.com/orders'

export class ConttrollersPaymentPagSeguro {
    async insertPix(request: Request, response: Response) {
        const sales: TPaymentPix = request.body
        let reqs = await fetch(urlPagseguro, {
            method: 'POST',
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
        const sales: TPaymentPagSeguroBoleto = request.body
        let reqs = await fetch(urlPagseguro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(sales)
        });
        let ress = await reqs.json();
        response.json(ress);
        console.log(ress);
    };

    async insertCard(request: Request, response: Response) {
        const sales: TPaymentPagSeguroCard = request.body
        let reqs = await fetch(urlPagseguro, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sales)
        });
        let ress = await reqs.json();
        response.json(ress)
        console.log(ress);
    }
}