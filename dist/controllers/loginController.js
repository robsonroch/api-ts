"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const User_1 = require("../models/User");
const helper_1 = require("../infra/helper");
const geraToken_1 = require("../infra/geraToken");
class LoginController {
    login(req, res) {
        const usuario = new User_1.default("Robson", "Rocha", "robson.proxycode@gmail.com", "123456");
        if (req.body.nome === usuario.nome && req.body.senha === usuario.senha) {
            helper_1.default.sendResponse(res, HttpStatus.OK, geraToken_1.default(usuario));
        }
        else {
            helper_1.default.sendResponse(res, HttpStatus.MISDIRECTED_REQUEST, "Usuario ou Senha Inválidos!");
        }
    }
}
exports.default = new LoginController();
