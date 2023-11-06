export type IProduct = {
    id_product?:number;
    created_at?:Date | any;
    descric_product:string;
    val_max_product:number;
    val_min_product:number;
    fk_brand:number;
    fk_sector:number;
    bar_code:string;
    image:string;
}