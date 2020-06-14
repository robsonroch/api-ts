"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(_nome, _sobrenome, _email, _senha) {
        this._nome = _nome;
        this._sobrenome = _sobrenome;
        this._email = _email;
        this._senha = _senha;
    }
    get nome() {
        return this._nome;
    }
    get sobrenome() {
        return this._sobrenome;
    }
    get email() {
        return this.sobrenome;
    }
    get senha() {
        return this._senha;
    }
    usuarioJson() {
        return JSON.stringify(this);
    }
}
exports.default = User;
