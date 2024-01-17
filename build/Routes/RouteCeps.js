"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCep = void 0;
const express_1 = require("express");
const ConttrollerCeps_1 = require("../Providers/pg/ConttrollerCeps");
const routeCep = (0, express_1.Router)();
exports.routeCep = routeCep;
const conttrollersCeps = new ConttrollerCeps_1.ConttrollerCeps();
routeCep.get('/', conttrollersCeps.index);
// routeCep.get('/ceps/:id', conttrollersCeps.select)
routeCep.get('/ceps', conttrollersCeps.select);
routeCep.post('/ceps', conttrollersCeps.insert);
