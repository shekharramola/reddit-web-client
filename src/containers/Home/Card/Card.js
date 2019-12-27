import React from 'react';
import classes from './Card.module.css';
import { regexFilters } from '../../../utility';
import ExpandedCardContent from '../Card/ExpandedCardContent/ExpandedCardContent';
import { oAuthAxios } from '../../../utils/api';
import {
    MdFavoriteBorder,
    MdArrowDropUp,
    MdArrowDropDown,
    MdMoreVert,
    MdChatBubbleOutline,
    MdShare, MdLabelOutline, MdExpandLess, MdExpandMore,
    MdComment,
} from 'react-icons/md';
import PostInformation from '../Card/PostInformation/PostInformation';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
const openCommentUI = () => {

}

export const card = ({ item, onOpenModal, onExpand, onVote }) => {
    const singleItem = item;
    const thumbnailImg = singleItem.thumbnail;
    const isExpandable = (singleItem.selftext !== '' || (regexFilters.image).test(singleItem.url) || (regexFilters.youtube).test(singleItem.url) || singleItem.is_video);
    const onClickTitle = (currentItem) => {
        onOpenModal(currentItem);
    }
    const vote = (item, voteValue) => {
        const id = item.name;
        onVote(id, voteValue);
    }
    return (
        <div className={classes.CardContainer}>
            <div className={classes.ContentArea}>
                <div className={classes.DetailedRow}>
                    <PostInformation post={singleItem} />
                    <div className={classes.ActionsBar}>
                        {isExpandable && (
                            <span className={classes.ActionItem} onClick={() => onExpand(item)}>
                                {
                                    !singleItem.isExpanded ? <MdExpandMore size={24} color="#747474" />
                                        : <MdExpandLess size={24} color="#747474" />
                                }
                            </span>
                        )}
                        <span className={classes.ActionItem}>
                            <MdFavoriteBorder size={20} color="#747474" />
                        </span>
                        <span className={classes.ActionItem}>
                            <MdMoreVert size={20} color="#747474" />
                        </span>
                    </div>
                </div>

                <div className={classes.ContentRow}>
                    <div className={classes.ContentDetails}>
                        {/* <NavLink
                            to={`/?permalink=${singleItem.permalink}`}>
                            <div className={classes.ContentTitle} href="#" onClick={() => onClickTitle(item)}>
                                {singleItem.link_flair_text && <span className={classes.TitleFlairText}>{singleItem.link_flair_text}</span>}
                                {singleItem.title}
                            </div>
                        </NavLink> */}

                        <div className={classes.ContentTitle} onClick={() => onClickTitle(item)}>
                            {singleItem.link_flair_text && <span className={classes.TitleFlairText}>{singleItem.link_flair_text}</span>}
                            {singleItem.title}
                        </div>

                    </div>
                    {!singleItem.isExpanded && (
                        thumbnailImg
                            ?
                            <img src={thumbnailImg} className={classes.ContentImage} alt="item preview" />

                            : <span className={classes.ContentNoImage}>
                                <MdComment />
                            </span>
                    )}
                </div>

                {
                    isExpandable && singleItem.isExpanded && (
                        <div className={classes.ExpandableContent}>

                            <ExpandedCardContent item={singleItem} />
                        </div>
                    )
                }

                <div className={classes.ActionsBar}>
                    <span className={classes.ActionItem}><MdChatBubbleOutline onClick={openCommentUI} />{singleItem.num_comments} comments
    </span>
                    <span className={classes.ActionItem}><MdShare /> Share
    </span>
                    <span className={classes.ActionItem}><MdLabelOutline /> {singleItem.domain}
                    </span>

                </div>


            </div>
            <span className={classes.VotingArea}>

                <MdArrowDropUp size={25} color="#747474" onClick={() => vote(singleItem, 1)} />
                <span className={classes.CurrentPoint}>{singleItem.score}</span>
                <MdArrowDropDown size={25} color="#747474" onClick={() => vote(singleItem, -1)} />
            </span>
        </div>

    );
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        vote: (id, voteValue) => dispatch(actions.vote(id, voteValue))
    };
};


export default connect(null, mapDispatchToProps)(WithErrorHandler(card, oAuthAxios));
