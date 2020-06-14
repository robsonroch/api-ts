import * as jwt from 'jsonwebtoken';
import  Configs from './configs';

class Auth{
    public validate(req, res, next){

        var token = req.headers['x-access-token'];

        if(token){
            jwt.verify(token, Configs.secret, function(err, decoded){
                if(err){
                    return res.status(403).send({
                        success: false,
                        message: "401 - Token Inválido"
                    })
                }else{
                    next();
                }
            })
        }else{
            return res.status(401).send({
                success: false,
                menssage: "401 - sem autorização"
            })
        }
    }
}

export default new Auth();