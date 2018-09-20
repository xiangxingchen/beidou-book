import { Controller } from 'egg';

export default class NovelController extends Controller {
  public async getGender() {
    // render view template in `app/views`
    const data = this.service.novel.getGender();

    this.ctx.body = data;
    this.ctx.status = 200;
  }
}
