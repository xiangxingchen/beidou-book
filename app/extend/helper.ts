import * as path from 'path';
import * as fs from 'fs';
module.exports = {
  assetWithHash(asset) {
    try {
      const mainfestFile = path.join(__dirname, '../build/manifest.json');
      if (fs.existsSync(mainfestFile)) {
        const raw = fs.readFileSync(mainfestFile, 'utf-8');
        const data = JSON.parse(raw);
        return data[asset];
      }
    } catch (e) {
      return {};
    }
  },
  getSeo(url: string): object {
    const seo = {
      '/': {
        title: '新一站保险网触屏版_网上投保，网上买保险，在线投保，保险网',
        desc: '新一站保险网是国内领先的网络保险电子商务平台，新一站保险网全面支持网上在线投保！网上买保险首选新一站！涵盖国内数十家知名保险公司的保险产品，' +
        '为您提供从保险产品的咨询、购买到理赔、保全等全过程的一站式服务。',
        keywords: '网上投保,网上买保险,在线投保,保险网',
      },
      '/ui': {
        title: 'ui',
        desc: 'ui',
        keywords: 'ui',
      },
    };
    return seo[url];
  },
};
