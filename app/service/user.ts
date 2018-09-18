import { Service } from 'egg';

export default class UserService extends Service {
    public async findAll() {
      // http://api.zhuishushenqi.com/book/fuzzy-search?query=${query}&start=0&limit=10
        this.logger.info('Fetch data');
        return Promise.resolve([ 'Jim', 'Peng', 'Gray' ]);
    }
}
