import * as HttpStatus from 'http-status';
import User from '../models/User';
import Helper from '../infra/helper'
import geraToken from '../infra/geraToken'

class LoginController{   

    public login(req, res){
        const usuario = new User("Robson", "Rocha", "robson.proxycode@gmail.com", "123456");
        
        if(req.body.nome === usuario.nome && req.body.senha === usuario.senha){
            Helper.sendResponse(res, HttpStatus.OK, geraToken(usuario));
        }else{
            Helper.sendResponse(res, HttpStatus.MISDIRECTED_REQUEST, "Usuario ou Senha Inválidos!")
        }
    }

    
}

export default new LoginController();