import { Controller } from 'egg';

export default class NovelController extends Controller {
  public async getGender() {
    // render view template in `app/views`
    const data = this.service.novel.getGender();

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
        novelStore: { ranking: data },
      },
    });
  }
  public async book() {
    const id = this.ctx.params.id;
    const data = await this.service.novel.getBookById(id);
    await this.ctx.render('index', {
      initState: {
        html: this.ctx.helper.getSeo('/'),
        userStore: { currentUser: 'chen', data: [ 123, 654321 ] },
        uiStore: { ui: 'fffffffffffffff' },
        novelStore: { bookInfo: data },
      },
    });
  }
}
