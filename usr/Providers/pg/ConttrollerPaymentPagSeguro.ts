import { Request, Response } from "express";
import { client } from "../../connect"
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

    async insertDirectPaymentHandle(request: Request, response: Response) {
        try {
            const sales: TPaymentPagSeguroPix = request.body
            await client.query
            const res_num_sale = await client.query
                ("SELECT MAX(id_sale) FROM sales");
            sales.reference_id  = res_num_sale.rows[0].max + 1;
            // console.log(sales)
            response.json(sales)

        } catch (err) {
            console.log("Error Occurred ! " + err)
        }
    }

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
                    'accept': 'application/json',
                    'Authorization': authorization,
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(sales)
            });
            let ress = await reqs.json();
            response.json(ress)
            console.log(ress);
            // console.log(sales)
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

    async payPagSeguro(request: Request, response: Response) {
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
        response.json(settings)
        console.log(settings);
    }
}