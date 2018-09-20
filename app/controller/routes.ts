import { Controller } from 'egg';

export default class RoutesController extends Controller {
  public async index() {
    // render view template in `client/index`
    const data = await this.service.novel.getGender();
    await this.ctx.render('index', {
      initState: {
        html: this.ctx.helper.getSeo('/'),
        userStore: { currentUser: 'chen', data: [ 123, 654321 ] },
        uiStore: { ui: 'fffffffffffffff' },
        novelStore: { rank: data },
      },
    });
  }
  public async ui() {
    await this.ctx.render('index', {
      initState: {
        html: this.ctx.helper.getSeo('/ui'),
        uiStore: { ui: 'fffffffffffffff' },
      },
    });
  }
}
