import * as Jwt from 'jsonwebtoken';
import Configs from '../infra/configs';
import User from '../models/User';

export default function geraToken(usuario: User){
    let payload = {
        iss: "geramos",
        iat: new Date().getSeconds(),
        exp: new Date().setMinutes(60),
        name: `${usuario.nome} ${usuario.sobrenome}`,
        email: usuario.email
    };
    return Jwt.sign(payload, Configs.secret);
}