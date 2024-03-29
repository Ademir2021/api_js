"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeProduct = void 0;
const express_1 = require("express");
const ConttrollerProducts_1 = require("../Providers/pg/ConttrollerProducts");
const routeProduct = (0, express_1.Router)();
exports.routeProduct = routeProduct;
const conttrollersProducts = new ConttrollerProducts_1.ConttrollersProducts();
routeProduct.get('/', conttrollersProducts.index);
routeProduct.get('/products/:user_id', conttrollersProducts.select);
routeProduct.get('/products_home', conttrollersProducts.selectHome);
routeProduct.get('/product/:id', conttrollersProducts.selectOneProduct);
routeProduct.post('/products', conttrollersProducts.insert);
routeProduct.put('/products/:id', conttrollersProducts.update);
routeProduct.delete('/products/:id', conttrollersProducts.delete);
