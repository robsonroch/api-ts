import NewsRepository from '../repository/newsRepository'
import NewsSchema from '../models/newsSchema'

class NewsService{
    get(){
        return  NewsRepository.find({});
    }

     getById(_id: string){
        return  NewsRepository.findById(_id);
    }

     create(news){
        return  NewsRepository.create(news);
    }

     update(_id, news){
        return  NewsRepository.findByIdAndUpdate(_id, news);
    }

     delete(_id){
        return  NewsRepository.findByIdAndRemove(_id);
    }
}

export default new NewsService();