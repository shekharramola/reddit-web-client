import { has, map } from 'lodash/fp';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const regexFilters = {
  youtube: /http[s]?:\/\/(www\.)?youtu(\.be|be\.com).*/i,
  image: /\.(gif|jpg|jpeg|tiff|png)$/i,
  youtubeShort: /http[s]?:\/\/(www\.)?youtu\.be\/(.*)/i,
};


export const getQueryParam = (queryString,searchedKey) => {
  const order = new URLSearchParams(queryString).get(searchedKey);
  
  return order;
}

export const normalizePosts = (arr, baseKey = 'name') => {
 
    const d = {};
    map.convert({cap: false})((post, index) => {
      const key = post.data[baseKey];
      d[key] = d[key] || {};
      d[key] = {
        ...arr[index].data,
      }
    }, arr);

    return d;
  }
  
  export const allCollection = (arr, baseKey = 'name') => map(post => post.data[baseKey], arr);
  

  export const getSubredditInfo = (list = {}, id, key = '') => {
    const { model } = list;
    if (has(id, model)) {
      if (key) {
        return model[id][key];
      }
      return model[id];
    }
    return null;
  }

  export const timeAgo = (millisecondsPerDay) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    let time =
    [
      [3.14 , 'second' ],
      [-15  , 'minute' ],
      [8    , 'hour'   ],
      [-1   , 'day'    ],
      [3    , 'week'   ],
      [-5   , 'month'  ],
      [2    , 'quarter'],
      [-42  , 'year'   ],
      [(new Date('9/22/2018') - new Date())/millisecondsPerDay,'day']
    ].forEach(d => console.log(   rtf.format(d[0], d[1]) 
    
    
    ));
    return time;
  }
   