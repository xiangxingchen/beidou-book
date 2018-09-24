import { Service } from 'egg';

interface IcateSearch {
  gender: string; // 男生:mael 女生:female 出版:press
  type: string;   // 热门:hot 新书:new 好评:repulation 完结: over 包月: month
  major: string;  // 大类别 从接口1获取
  minor?: string;  // 小类别 从接口4获取 (非必填)
  start: number;
  limit: number;
}

export default class NovelService extends Service {

  /**
   * 1、获取所有分类
   */
  public async getAllClass() {
    this.logger.info('Fetch data');
    return this.ctx.curl('http://api.zhuishushenqi.com/cats/lv2/statistics');
  }

  /**
   * 2、获取排行榜类型
   */
  public async getGender() {
    const { data } = await  this.ctx.curl('http://api.zhuishushenqi.com/ranking/gender');
    return JSON.parse(data.toString());
  }

  /**
   * 3、获取排行榜小说
   * @param rankId
   */
  public async getRankById(rankId: string) {
    const { data } = await this.ctx.curl(`http://api.zhuishushenqi.com/ranking/${rankId}`);
    return JSON.parse(data.toString()).ranking;
  }

  /**
   * 4、获取分类下小类别
   */
  public async getSmallClass() {
    return this.ctx.curl('http://api.zhuishushenqi.com/cats/lv2');
  }

  /**
   * 5、根据分类获取小说列表
   * @param cateSearch
   */
  public async getBookbyCategories(cateSearch: IcateSearch) {
    return this.ctx.curl('https://api.zhuishushenqi.com/book/by-categories', {
      data: cateSearch,
    });
  }

  /**
   * 6、获取小说信息
   * @param bookId
   */
  public async getBookById(bookId: string) {
    return this.ctx.curl(`http://api.zhuishushenqi.com/book/${bookId}`);
  }

  /**
   * 7、获取小说正版源于盗版源(混合)
   * @param bookId
   */
  public async getAtoc(bookId: string) {
    return this.ctx.curl(`http://api.zhuishushenqi.com/atoc?view=summary&book=${bookId}`);
  }

  /**
   * 8、获取小说章节(根据小说id)
   * @param bookId
   */
  public async getChaptersByBookId(bookId: string) {
    return this.ctx.curl(`http://api.zhuishushenqi.com/mix-atoc/${bookId}?view=chapters`);
  }

  /**
   * 9、获取小说章节(根据小说源id)
   * @param sourceId
   */
  public async getChaptersBySourceId(sourceId: string) {
    return this.ctx.curl(`http://api.zhuishushenqi.com/atoc/${sourceId}?view=chapters`);
  }

  /**
   * 10、获取小说章节内容
   * @param link
   */
  public async getChaptersByLink(link: string) {
    return this.ctx.curl(`http://chapterup.zhuishushenqi.com/chapter/${link}`);
  }

  /**
   * 11、搜索自动补充
   * @param query
   */
  public async autoComplete(query: string) {
    return this.ctx.curl(`http://api.zhuishushenqi.com/book/auto-complete?query=${query}`);
  }

  /**
   * 12、模糊搜索
   * @param query
   */
  public async fuzzySearch(query: string) {
    return this.ctx.curl(`http://api.zhuishushenqi.com/book/fuzzy-search?query=${query}`);
  }

  /**
   * 13、获取小说最新章节
   * @param id
   */
  public async getNewChapter(id: string) {
    return this.ctx.curl(`http://api05iye5.zhuishushenqi.com/book?view=updated&id=${id}`);
  }
}
