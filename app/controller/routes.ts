import { Controller } from 'egg';

export default class RoutesController extends Controller {
  public async home() {
    this.ctx.redirect('/user');
  }

  public async show() {
    await this.ctx.render('/index');
  }
}
