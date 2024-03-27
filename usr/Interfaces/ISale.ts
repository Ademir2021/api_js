export type TSale = {
    filial: number;
    user_id: number;
    user: string;
    fk_name_pers: number;
    name_pers: string;
    cpf_pers: string;
    address_pers: string;
    phone_pers: string;
    bairro_pers: string
    fk_cep: number;
    num_cep: string | undefined | any
    name_city: string | undefined | any
    uf: string | undefined
    disc_sale: number;
    tItens: number;
    tNote: number;
    paySale: number;
    itens: [
        {
            id: number;
            item: number;
            descric: string;
            amount: number | any;
            valor: number | any;
            tItem: number;
        }
    ]
};