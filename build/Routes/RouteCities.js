"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCity = void 0;
const express_1 = require("express");
const ConttrollerCities_1 = require("../Providers/pg/ConttrollerCities");
const routeCity = (0, express_1.Router)();
exports.routeCity = routeCity;
const conttrollersCities = new ConttrollerCities_1.ConttrollerCities();
routeCity.get('/', conttrollersCities.index);
// routeCity.get('/cities/:id', conttrollersCities.select)
routeCity.get('/cities', conttrollersCities.select);
