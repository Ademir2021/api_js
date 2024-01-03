"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeBrand = void 0;
const express_1 = require("express");
const ConttrollerBrands_1 = require("../Providers/pg/ConttrollerBrands");
const routeBrand = (0, express_1.Router)();
exports.routeBrand = routeBrand;
const conttrollersBrands = new ConttrollerBrands_1.ConttrollerBrands();
routeBrand.get('/', conttrollersBrands.index);
// routeBrand.get('/brands/:id', conttrollersBrands.select)
routeBrand.get('/brands', conttrollersBrands.select);
