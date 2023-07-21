export type TPaymentPix = {
    reference_id:string | number;
    customer:{name:string, email:string, tax_id:string, phones:[{country:string, area:string, number:string, type:string}]};
    items:[{name:string, quantity:number, unit_amount:number}] | any;
    qr_codes:[{amount:{value:number}, expiration_date:string | Date, links:[{href:string}]}];
    shipping:{address:{street:string, number: string, complement: string, locality: string, city: string,
    region_code:string, country: string, postal_code: string}};
    notification_urls: [string]
}