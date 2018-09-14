import _ from 'lodash';

export function obj2UrlParams(obj: object) {
  let query = '';
  Object.keys(obj).map(key => {
    if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
      obj[key].map(item => {
        query += `${encodeURIComponent(key)}=${encodeURIComponent(item)}&`;
      });
    } else {
      query += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
    }
  });
  return '?' + query.slice(0, query.length - 1);
}

export function urlParams2Obj(params: string) {
  const pairs = decodeURIComponent(params.slice(1)).split('&');

  const result = {};
  pairs.forEach((item) => {
    if (item) {
      const pair = item.split('=');
      pair[1] = pair[1] || '';
      if (result[pair[0]] && _.isArray(result[pair[0]])) {
        result[pair[0]].push(pair[1]);
      } else if (result[pair[0]] && !_.isArray(result[pair[0]])) {
        result[pair[0]] = [ result[pair[0]], pair[1] ];
      } else {
        result[pair[0]] = pair[1];
      }
    }
  });

  return result;
}
