"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePix = void 0;
const express_1 = require("express");
const ConttrolerPix_1 = require("../Providers/pg/ConttrolerPix");
const routePix = (0, express_1.Router)();
exports.routePix = routePix;
const conttrollersPix = new ConttrolerPix_1.ConttrollersPix();
// routePix.get('/', conttrollersPix.index)
// routeUser.get('/login/:username', conttrollersPix.login)
routePix.get('/pix', conttrollersPix.select);
