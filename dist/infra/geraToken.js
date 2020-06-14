"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt = require("jsonwebtoken");
const configs_1 = require("../infra/configs");
function geraToken(usuario) {
    let payload = {
        iss: "geramos",
        iat: new Date().getSeconds(),
        exp: new Date().setMinutes(60),
        name: `${usuario.nome} ${usuario.sobrenome}`,
        email: usuario.email
    };
    return Jwt.sign(payload, configs_1.default.secret);
}
exports.default = geraToken;
