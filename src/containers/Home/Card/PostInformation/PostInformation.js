
import React from 'react';
import { getSubredditInfo } from '../../../../utility';
import classes from './PostInformation.module.css';
//import Avatar from '../../../../components/Avatar/Avatar';
//import {timeAgo} from '../../../../utility';
import { formatDistance } from 'date-fns'

export const PostInformation = ({
  post, subreddits, fetchSubReddit,
  showAvatar, showSubreddit,
}) => {
  if (!post) {
    return null;
  }

  const subredditIcon = getSubredditInfo(subreddits, post.subreddit_id, 'icon_img');
 
  //const avatarImage = subredditIcon ? subredditIcon : '';

  const onClick = () => {
    //  const href = `/${post.subreddit_name_prefixed}`;

    fetchSubReddit({
      sub: post.subreddit
    });

    //   Router.push(`/?subredditName=${post.subreddit}`, href, { shallow: true });
  }
  const timeAgo = formatDistance(post.created_utc * 1000, Date.now()); // | formatDistance(post.created_utc * 1000);
  
  // return (
  //   <div className={classes.Information}>
  //   { showAvatar && <Avatar width={24} inlineBlock imageSrc={avatarImage} /> }
  //   { showSubreddit && (
  //     <span className={classes.PostSubreddit} onClick={onClick}>
  //       {post.subreddit_name_prefixed} ・ 
  //     </span>)
  //   }{post.author?'Posted by':''} {post.author} ・ {timeAgo}
  // </div>
  // )

  return (
    <div className={classes.Information}>
      <span className={classes.PostSubreddit} onClick={onClick}>
        {post.subreddit_name_prefixed} ・
        </span>
      }{post.author ? 'Posted by' : ''} {post.author} ・ {timeAgo}
    </div>
  )
}

export default PostInformation;