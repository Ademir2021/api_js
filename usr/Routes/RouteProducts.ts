import { Router } from "express"
import { ConttrollersProducts } from "../Providers/pg/ConttrollerProducts";

const routeProduct = Router();
const conttrollersProducts = new ConttrollersProducts()

routeProduct.get('/', conttrollersProducts.index)
routeProduct.get('/products', conttrollersProducts.select)
routeProduct.post('/products', conttrollersProducts.insert)

export { routeProduct }