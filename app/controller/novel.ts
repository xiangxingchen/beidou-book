import { Controller } from 'egg';

export default class NovelController extends Controller {
  public async getGender() {
    const data = this.service.novel.getGender();

    this.ctx.body = data;
    this.ctx.status = 200;
  }
  public async getRanking() {
    console.log('-------', this.ctx.params);
    const id = this.ctx.params.id;
    const data = await this.service.novel.getRankById(id);
    this.ctx.body = data;
    this.ctx.status = 200;
  }
  public async getBookReview() {
    console.log('-------', this.ctx.params);
    const id = this.ctx.params;
    const data = await this.service.novel.getBookReview(id);
    this.ctx.body = data;
    this.ctx.status = 200;
  }

  public async getBookById() {
    console.log('-------', this.ctx.params);
    const id = this.ctx.params.id;
    const data = await this.service.novel.getBookById(id);
    this.ctx.body = data;
    this.ctx.status = 200;
  }

  public async ranking() {
    const id = this.ctx.params.id;
    const data = await this.service.novel.getRankById(id);
    await this.ctx.render('index', {
      initState: {
        html: this.ctx.helper.getSeo('/'),
        userStore: { currentUser: 'chen', data: [ 123, 654321 ] },
        uiStore: { ui: 'fffffffffffffff' },
        novelStore: { ranking: data, bookInfo: {}  },
      },
    });
  }
  public async book() {
    const id = this.ctx.params.id;
    const data = await this.service.novel.getBookById(id);
    const recommend = await this.service.novel.getBookRecommend(id);
    const review = await this.service.novel.getBookReview({
      book: id,
      start: 1,
      limit: 10,
    });

    await this.ctx.render('index', {
      initState: {
        html: this.ctx.helper.getSeo('/'),
        userStore: { currentUser: 'chen', data: [ 123, 654321 ] },
        uiStore: { ui: 'fffffffffffffff' },
        novelStore: { ranking: { books: [] } },
        bookStore: { bookInfo: data, bookReview: review, recommendBook: recommend },
      },
    });
  }
}
