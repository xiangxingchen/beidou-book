import { Service } from 'egg';

interface IcateSearch {
  gender: string; // 男生:mael 女生:female 出版:press
  type: string;   // 热门:hot 新书:new 好评:repulation 完结: over 包月: month
  major: string;  // 大类别 从接口1获取
  minor?: string;  // 小类别 从接口4获取 (非必填)
  start: number;
  limit: number;
}

interface IBookReview {
  book: string;
  sort?: 'updated' | 'created' | 'comment-count';
  sortType?: 'updated' | 'created' | 'comment-count';
  start?: number;
  limit?: number;
}
interface IBookList {
  sort: 'collectorCount' | 'created';
  duration: 'last-seven-days' | 'all';
  gender: 'male' | 'female';
  tag?: string;
  start?: number;
}
const option = { dataType: 'json' };

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
    const { data } = await  this.ctx.curl('http://api.zhuishushenqi.com/ranking/gender', option);
    return data;
  }

  /**
   * 3、获取排行榜小说
   * @param rankId
   */
  public async getRankById(rankId: string) {
    const { data } = await this.ctx.curl(`http://api.zhuishushenqi.com/ranking/${rankId}`, option);
    data.ranking.books.map(item => {
      item.cover = item.cover.slice(7).slice(0, -3);
      return item;
    });
    return data.ranking;
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
    const { data } = await this.ctx.curl(`http://api.zhuishushenqi.com/book/${bookId}`, option);
    data.cover = data.cover.slice(7).slice(0, -3);
    return data;
  }

  /**
   * 7、获取小说正版源于盗版源(混合)
   * @param bookId
   */
  public async getAtoc(bookId: string) {
    const { data } = await this.ctx.curl(`http://api.zhuishushenqi.com/atoc?view=summary&book=${bookId}`, option);
    return data;
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
    // encodeURIComponent(sourceId)
    const { data } = await this.ctx.curl(`http://api.zhuishushenqi.com/atoc/${sourceId}?view=chapters`, option);
    return data;
  }

  /**
   * 10、获取小说章节内容
   * @param link
   */
  public async getChaptersByLink(link: string) {
    const { data } = await this.ctx.curl(`http://chapterup.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`, option);
    return data;
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

  /**
   * 14、获取讨论
   * @param query
   */
  public async getBookPost(query: IBookReview) {
    const { data } = await this.ctx.curl('http://api.zhuishushenqi.com/post/by-book', {
      data: query,
      ...option,
    });
    return data;
  }

  /**
   * 15、获取短评
   * @param query
   */
  public async getBookShortReview(query: IBookReview) {
    const { data } = await this.ctx.curl('http://api.zhuishushenqi.com/post/short-review/by-book', {
      data: query,
      ...option,
    });
    return data;
  }

  /**
   * 16、获取书评
   * @param query
   */
  public async getBookReview(query: IBookReview) {
    const { data } = await this.ctx.curl('http://api.zhuishushenqi.com/post/review/by-book', {
      data: query,
      ...option,
    });
    return data.reviews;
  }
  /**
   * 17、推荐书籍
   * @param bookId
   */
  public async getBookRecommend(bookId: string) {
    const { data } = await this.ctx.curl(`https://novel.juhe.im/recommend/${bookId}`, option);
    data.books.map(item => {
      item.cover = item.cover.slice(7).slice(0, -3);
      return item;
    });
    return data.books;
  }

  /**
   * 18、获取书单
   * @param query
   */
  public async getBookList(query: IBookList) {
    const { data } = await this.ctx.curl('http://api.zhuishushenqi.com/book-list', {
      data: query,
      ...option,
    });
    return data;
  }
  /**
   * 19、获取书单详情
   * @param bookListId
   */
  public async getBookListDetail(bookListId: string) {
    const { data } = await this.ctx.curl(`http://api.zhuishushenqi.com/book-list/${bookListId}`, option);
    return data;
  }

}
