import { Router } from "express"
import { ConttrollersProducts } from "../Providers/pg/ConttrollerProducts";

const routeProduct = Router();
const conttrollersProducts = new ConttrollersProducts()

routeProduct.get('/', conttrollersProducts.index)
routeProduct.get('/products/:user_id', conttrollersProducts.select)
routeProduct.get('/product/:id', conttrollersProducts.selectOneProduct)
routeProduct.post('/products', conttrollersProducts.insert)
routeProduct.put('/products/:id', conttrollersProducts.update)
routeProduct.delete('/products/:id', conttrollersProducts.delete)

export { routeProduct }