"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeSector = void 0;
const express_1 = require("express");
const ConttrollerSectors_1 = require("../Providers/pg/ConttrollerSectors");
const routeSector = (0, express_1.Router)();
exports.routeSector = routeSector;
const conttrollerSectors = new ConttrollerSectors_1.ConttrollerSectors();
routeSector.get('/', conttrollerSectors.index);
// routeBrand.get('/brands/:id', conttrollersBrands.select)
routeSector.get('/sectors', conttrollerSectors.select);
