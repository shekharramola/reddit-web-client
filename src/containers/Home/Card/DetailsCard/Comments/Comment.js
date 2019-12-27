
import React from 'react';
import { map } from 'lodash/fp';
import Markdown from 'react-markdown';
import PostInformation from '../../PostInformation/PostInformation';
import classes from './Comment.module.css';
const PostComments = ({ list }) => {
  if (!list) {
    return null;
  }
  return (
    <div className={classes.CommentsArea}>
      {map(comment => (
        <div className={classes.Comment}>
          <PostInformation post={comment} showAvatar={false} showSubreddit={false} />
          <div className={classes.CommentBody}>
            <Markdown
              source={comment.body}
              linkTarget="_blank"
            />
          </div>
        </div>
      ), list)}
    </div>
  )
};

export default PostComments;