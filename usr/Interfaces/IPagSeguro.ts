export type TPaymentPix = {
    reference_id:string | number;
    customer:{name:string, email:string, tax_id:string, phones:[{country:string, area:string, number:string, type:string}]};
    items:[{name:string, quantity:number, unit_amount:number}] | any;
    qr_codes:[{amount:{value:number}, expiration_date:string | Date, links:[{href:string}]}];
    shipping:{address:{street:string, number: string, complement: string, locality: string, city: string,
    region_code:string, country: string, postal_code: string}};
    notification_urls: [string]
};

export type TPaymentPagSeguroBoleto={
    reference_id: string | number;
    customer:{name:string, email:string, tax_id:string,
        phones:[{country: string, area:string, number:string, type: string}]},
    description:string;
    amount:{value:number | string, currency:string};
    payment_method:{type:string;
    boleto:{due_date: Date | string;
    instruction_lines:{line_1:string, line_2:string};
    holder:{name:string,tax_id:string, email:string;
    address:{street:string, number:string, locality:string,
        city:string, region:string, region_code:string, country:string, postal_code:string}}}};
    notification_urls:[string]
};

export type TPaymentPagSeguroCard = {
    reference_id: string | number,
    customer:{name:string, email:string, tax_id:string},
    description:string, amount:{value:number, currency: string},
    payment_method:{type: string, installments:number, capture: boolean,
    soft_descriptor:string, card:{number:string, exp_month:string, exp_year:string,
    security_code:string, holder:{name:string}}},
    notification_urls:[string]

};