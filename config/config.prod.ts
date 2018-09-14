import * as path from 'path';

module.exports = appInfo => {
   return {
       keys: 'secret',
       static: {
           prefix: '/build/',
           dir: path.join(appInfo.baseDir, 'app/build'),
           dynamic: false,
           preload: true,
       },
   };
};
