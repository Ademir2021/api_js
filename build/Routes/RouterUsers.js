"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const ConttrollerUsers_1 = require("../Controllers/ConttrollerUsers");
const connect_1 = require("../connect");
connect_1.client.connect(); /** Somente no RouterUSers ?? */
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
const conttrollersUSers = new ConttrollerUsers_1.ConttrollersUSers();
routerUser.get('/', conttrollersUSers.index);
routerUser.get('/login/:username', conttrollersUSers.login);
routerUser.get('/users', conttrollersUSers.select);
routerUser.post('/users', conttrollersUSers.insert);
routerUser.post('/users', conttrollersUSers.update);
routerUser.post('/users', conttrollersUSers.delete);
