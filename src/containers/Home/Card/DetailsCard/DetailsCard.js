import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { has } from 'lodash/fp';
import {
  MdFavoriteBorder,
  MdMoreVert,
  MdChatBubbleOutline,
  MdShare, MdLabelOutline,
} from 'react-icons/md';
import PostInformation from '../PostInformation/PostInformation';
import ExpandedCardContent from '../ExpandedCardContent/ExpandedCardContent';
import Comments from './Comments/Comment';
import * as actions from '../../../../store/actions/index';
import classes from './DetailsCard.module.css';

class DetailsCard extends PureComponent {
  componentDidMount() {
    const { currentModalItem } = this.props;
    if (currentModalItem) {
      this.props.fnFetchPostComments(currentModalItem, this.props.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentModalItem !== nextProps.currentModalItem) {
      if (nextProps.currentModalItem) {
        this.props.fnFetchPostComments(nextProps.currentModalItem);
      }
    }
  }

  render() {
    const { currentModalItem } = this.props;
    if (!currentModalItem) {
      return null;
    }
    const singleItem = currentModalItem;
    const itemComments = has(singleItem.name, this.props.comments) ? this.props.comments[singleItem.name] : [];

    return (
      <div className={classes.CardContainer}>
        <div className={classes.ContentArea}>
          <div className={classes.DetailsRow}>
            <PostInformation post={singleItem} />
            <div className={classes.ActionsBar}>
              <span className={classes.ActionItem}><MdFavoriteBorder size={20} color="#747474" /></span>
              <span className={classes.ActionItem}><MdMoreVert size={20} color="#747474" /></span>
            </div>
          </div>
          <div className={classes.ContentRow}>
            <div className={classes.ContentDetails}>
              <p className={classes.ContentTitle}>{singleItem.title}</p>
              <a className={classes.ContentURL} href={`https://www.reddit.com${singleItem.permalink}`} target="_blank">{singleItem.permalink}</a>
              <div className={classes.ExpandableContent}>
                <ExpandedCardContent item={singleItem} />
              </div>
            </div>
          </div>
          <div className={classes.ActionsBar}>
            <span className={classes.ActionItem}><MdChatBubbleOutline /> {singleItem.num_comments} comments</span>
            <span className={classes.ActionItem}><MdShare /> Share</span>
            <span className={classes.ActionItem}><MdLabelOutline /> {singleItem.domain}</span>
          </div>
          {!this.props.loading &&
            <Comments list={itemComments}
            />}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentModalItem: state.home.currentModalItem,
  comments: state.home.comments,
  token: state.auth.token || localStorage.getItem('token'),
  loading: state.home.loading
});

const mapDispatchToProps = (dispatch) => ({
  fnFetchPostComments: (item, token) => dispatch(actions.fetchPostComments(item, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsCard);
