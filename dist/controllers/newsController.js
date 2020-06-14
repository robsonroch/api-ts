"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const helper_1 = require("../infra/helper");
const redis = require("redis");
class NewsController {
    get(req, res) {
        // let client = redis.createClient(6378, "localhost");  //local docker -foi mepeado 6378:6379 no redis-portalnews
        //let client = redis.createClient(6379, "localhost");  //local maquina
        let client = redis.createClient(6379, "redis"); //com compose (nuvem)
        client.get('news', function (err, reply) {
            if (reply) {
                console.log("foi no redis");
                helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
            }
            else {
                console.log("foi no mongo");
                newsService_1.default.get()
                    .then(news => {
                    client.set('news', JSON.stringify(news));
                    client.expire('news', 20);
                    helper_1.default.sendResponse(res, HttpStatus.OK, news);
                })
                    .catch(error => console.error.bind(console, `Error ${error}`));
            }
        });
    }
    getById(req, res) {
        const _id = req.params.id;
        console.log(_id);
        newsService_1.default.getById(_id)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        let vm = req.body;
        newsService_1.default.create(vm)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.CREATED, "Noticia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let vm = req.body;
        newsService_1.default.update(_id, vm)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, "Noticia atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        newsService_1.default.delete(_id)
            .then(() => helper_1.default.sendResponse(res, HttpStatus.MOVED_PERMANENTLY, "Noticia deletada com sucesso"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
