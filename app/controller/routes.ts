import { Controller } from 'egg';

export default class RoutesController extends Controller {
  public async index() {
    // render view template in `client/index`
    await this.ctx.render('index', {
      initState: { html: this.ctx.helper.getSeo('/') },
      userStore: { currentUser: 'chen', data: [ 123, 654321 ] },
    });
  }
  public async ui() {
    await this.ctx.render('index', {
      initState: { html: this.ctx.helper.getSeo('/ui'),
      },
    });
  }
}
