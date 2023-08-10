import { Request, Response } from "express";
import { TPaymentPagSeguroPix, TPaymentPagSeguroBoleto, TPaymentPagSeguroCard } from "../../Interfaces/IPagSeguro";
const fetch = require('node-fetch')
const authorization = '4D1D1C943B1B49468F2D0B00F5EE914E'
const urlPagseguroPix = 'https://sandbox.api.pagseguro.com/orders'
const urlPagseguro = 'https://sandbox.api.pagseguro.com/orders'

export class ConttrollersPaymentPagSeguro {

    async insertPix(request: Request, response: Response) {

        try {
            const sales: TPaymentPagSeguroPix = request.body
            let reqs = await fetch(urlPagseguroPix, {
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
            console.log(sales)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insertBoleto(request: Request, response: Response) {

        try {
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
            console.log(sales)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async insertCard(request: Request, response: Response) {

        try {
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
            console.log(sales)
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    };

    async publicKeyPagSeguro(request: Request, response: Response) {
        try {
            let reqs = await fetch('https://sandbox.api.pagseguro.com/public-keys', {
                method: 'POST',
                headers: {
                    'Authorization': authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'card' })
            });
            let ress = await reqs.json();
            response.json(ress)
            // console.log(ress);
        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    }
}