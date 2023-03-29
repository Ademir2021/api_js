"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./usr/Entities/User");
class ControllersUSers {
    insert() {
        const users = [];
        const res = {
            id: 12,
            name: "Ademir",
            username: "centroserra@gmail.com",
            password: "123"
        };
        const args = __rest(res, []);
        const user = new User_1.User(args.id, args.name, args.username, args.password);
        users.push(args);
        console.log(users);
    }
}
const conttrollersUSers = new ControllersUSers();
conttrollersUSers.insert();
