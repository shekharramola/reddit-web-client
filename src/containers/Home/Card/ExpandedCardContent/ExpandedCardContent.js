
import { regexFilters } from '../../../../utility';
import React from 'react';
import { last } from 'lodash/fp';

import YTPlayer from 'react-youtube';
import Markdown from 'react-markdown';
import classes from './ExpandedCardContent.module.css';

const expandedCardContent = ({ item, expanded }) => {
  
  if (item.selftext) {
    return (
      <div className={classes.DetailContent}>
        <Markdown
          source={item.selftext}
          linkTarget="_blank"
        />
      </div>
    );
  }
  else if ((regexFilters.image).test(item.url)) {
    return (
      <div className={classes.DetailContent}>
        <img className={classes.Image} alt={item.title} src={item.url} />
      </div>
    );
  }
  else if (regexFilters.youtube.test(item.url)) {
    let videoId;
    if (regexFilters.youtubeShort.test(item.url)) { //https://youtu.be/{id}
      videoId = regexFilters.youtubeShort.exec(item.url)[2];
    }
    else { //https://www.youtube.com/watch?v={id}
      const urlParts = item.url.split('watch?v=');
      videoId = urlParts[urlParts.length - 1];
    }
    if (videoId) {
      return (
        <div className={classes.DetailContent}>
          <YTPlayer videoId={videoId}></YTPlayer>
        </div>
      );
    }
  } else {
    if (item.is_reddit_media_domain) {
      const { images } = item.preview;
      const prevImage = images.length > 0 && last(images[0].resolutions);
      const videoFile = item.secure_media.reddit_video.hls_url;
      return (
        <div className={classes.DetailContent}>
          <video
            poster={prevImage ? prevImage.url.replace(/&amp;/g, '&') : ''}
            muted=""
          >
            <source
              src={videoFile}
              type="application/vnd.apple.mpegURL"
            />
          </video>
        </div>
      )
    }
  }
  // }
  return null;
}
export default expandedCardContent;
