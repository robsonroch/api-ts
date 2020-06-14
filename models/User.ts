class User{
    constructor(private _nome: string, private _sobrenome: string, private _email: string, private _senha: string){}
    
    get nome(){
        return this._nome;
    }

    get sobrenome(){
        return this._sobrenome;
    }

    get email(){
        return this.sobrenome;
    }

    get senha(){
        return this._senha;
    }

    usuarioJson(){
        
        return JSON.stringify(this);
    }
}

export default User;