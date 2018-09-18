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
        title: 'beidou-one-title',
        desc: 'beidou-one-desc',
        keywords: 'beidou-one-keywords',
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
