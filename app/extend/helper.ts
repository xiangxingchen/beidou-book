import * as path from 'path';
import * as fs from 'fs';
module.exports = {
  assetWithHash(asset) {
    try {
      const mainfestFile = path.join(__dirname, '../public/manifest.json');
      if (fs.existsSync(mainfestFile)) {
        const raw = fs.readFileSync(mainfestFile, 'utf-8');
        const data = JSON.parse(raw);
        console.log('raw', asset, data[asset]);
        return data[asset];
      }
    } catch (e) {
      return {};
    }
  },
};
