import { Controller } from 'egg';

export default class NovelController extends Controller {
  public async getGender() {
    const data = this.service.novel.getGender();

    this.ctx.body = data;
    this.ctx.status = 200;
  }
  public async getRanking() {
    const id = this.ctx.params.id;
    const data = await this.service.novel.getRankById(id);
    this.ctx.body = data;
    this.ctx.status = 200;
  }
  public async getBookReview() {
    const id = this.ctx.params;
    const data = await this.service.novel.getBookReview(id);
    this.ctx.body = data;
    this.ctx.status = 200;
  }

  public async getBookById() {
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
  public async chapter() {
    console.log('---chapter--', this.ctx.params);
    const { id, chapter } = this.ctx.params;
    const sourceArr = await this.service.novel.getAtoc(id);
    console.log(sourceArr);
    const chapterList = await this.service.novel.getChaptersBySourceId(sourceArr[0]._id);
    const chapterInfo = await this.service.novel.getChaptersByLink(chapterList.chapters[0].link);
    await this.ctx.render('index', {
      initState: {
        html: this.ctx.helper.getSeo('/'),
        userStore: { currentUser: 'chen', data: [ 123, 654321 ] },
        uiStore: { ui: 'fffffffffffffff' },
        novelStore: { ranking: { books: [] } },
        bookStore: { bookInfo: {}, bookReview: [], recommendBook: [] },
        chapterStore: {
          sourceArr,
          chapterList,
          chapterInfo,
        },
      },
    });
  }
}
