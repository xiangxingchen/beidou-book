import { Controller } from 'egg';

export default class RoutesController extends Controller {
  public async show() {
    await this.ctx.render('/index');
  }
  public async index() {
    this.ctx.body = [ '123', '456' ];
    this.ctx.status = 200;
  }
}
