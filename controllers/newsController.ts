import NewsService from '../services/newsService'
import * as HttpStatus from 'http-status'
import Helper from '../infra/helper'
import * as redis from 'redis'

class NewsController{   

    get(req, res){
        // let client = redis.createClient(6378, "localhost");  //local docker -foi mepeado 6378:6379 no redis-portalnews
        //let client = redis.createClient(6379, "localhost");  //local maquina
        let client = redis.createClient(6379, "redis");  //com compose (nuvem)
        client.get('news', function(err, reply){
            if(reply){
                console.log("foi no redis");
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
            }else{
                console.log("foi no mongo");
                NewsService.get()
                .then(news => {
                    client.set('news', JSON.stringify(news))
                    client.expire('news', 20);
                    Helper.sendResponse(res, HttpStatus.OK, news)
                })
                .catch(error => console.error.bind(console, `Error ${error}`));
            }
        })
        
    }

    getById(req, res){
        const _id = req.params.id;
        console.log(_id);
         NewsService.getById(_id)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }

    create(req, res){
        let vm = req.body;
        NewsService.create(vm)
        .then(news => Helper.sendResponse(res, HttpStatus.CREATED, "Noticia cadastrada com sucesso!"))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }

    update(req, res){
        const _id = req.params.id;
        let vm = req.body;
        NewsService.update(_id, vm)
        .then(news => Helper.sendResponse(res, HttpStatus.OK, "Noticia atualizada com sucesso!"))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }

    delete(req, res){
        const _id = req.params.id;
         NewsService.delete(_id)
        .then(() => Helper.sendResponse(res, HttpStatus.MOVED_PERMANENTLY, "Noticia deletada com sucesso"))
        .catch(error => console.error.bind(console, `Error ${error}`))
    }
}

export default new NewsController();