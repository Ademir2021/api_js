export type IPerson = {
    id_person?:number;
    created_at?:Date | any;
    name_pers:string | any;
    cpf_pers:string;
    phone_pers:string | any ;
    address_pers:string;
    bairro_pers:string;
    fk_name_filial:number;
    fk_id_user:number;
    fk_cep:number;
  }