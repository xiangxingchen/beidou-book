import { Service } from 'egg';

interface SInterface {
  query: string;
  start: number;
  limit: number;
}

export default class UserService extends Service {
    public async findAll(search: SInterface) {
      this.logger.info('Fetch data');
      this.ctx.curl('http://api.zhuishushenqi.com/book/fuzzy-search', {
        data: search,
      });
      return Promise.resolve([ 'Jim', 'Peng', 'Gray' ]);
    }
}
