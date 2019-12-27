import React, { Component } from "react";
import { connect } from 'react-redux';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { oAuthAxios } from '../../utils/api';
import * as actions from '../../store/actions/index';
import Topbar from "./Topbar/Topbar";
import classes from "./Home.module.css";
import Card from '../Home/Card/Card';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import DetailsCard from './Card/DetailsCard/DetailsCard';
class Home extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     ...this.props.posts,
  //     itemModalOpen: false,
  //     currentModalItem: null,
  //     previousPath: '/',
  //   };
  // }




  componentDidMount() {
    const order = new URLSearchParams(this.props.location.search).get('sort');
   

    this.props.onSortChange(order, this.props.token);
  }
  onLoadMoreItems() {
    this.props.onLoadMore(this.props.sort, this.props.after, this.props.token);
  }


  onOpenModal = (currentItem) => {
    
    this.props.fnSetModalItem(currentItem);
  };

  vote(id, voteValue) {
    this.props.vote(id, voteValue, this.props.token);
  }

  onCloseModal() {
    this.props.onCloseModal();
  }
  render() {
    let modelItem = null;
    if (this.props.isModelOpen) {
      modelItem = (
        <Modal
          show={this.props.isModelOpen}
          modalClosed={this.props.onCloseModal}>
          <DetailsCard />
        </Modal>
      )
    }

    const posts = this.props;
    const finalItems = posts.allPosts;
    return (
      <div className={classes.MiddleContentWrapper}>
        {modelItem}
        <Topbar />
        <div className={classes.Content}>
          {
            finalItems && finalItems.length > 0 && finalItems.map(name => (
              <Card key={name} item={posts.model[name]} onOpenModal={this.onOpenModal} onCloseModal={this.onCloseModal} onExpand={this.props.fnExpandItem} onVote={(id, voteValue) => this.vote(id, voteValue)} />
            ), finalItems)
          }
        </div>
        <div className={classes.PageActions}>
          <Button btnType="Danger" width="27%" clicked={this.onLoadMoreItems.bind(this)}>Load More</Button>
        </div>
        <footer>
          <div className={classes.CopyrightText}>
            Use of this site constitutes acceptance of our User Agreement and Privacy Policy.
          <br />© 2019 reddit inc. All rights reserved.
            </div>
        </footer>
      </div>


    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token || localStorage.getItem('token'),
    items: state.home.items,
    model: state.home.model,
    after: state.home.after,
    sort: state.home.sort,
    allPosts: state.home.allPosts,
    currentModalItem: state.home.currentModalItem,
    isModelOpen: state.home.isModelOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fnExpandItem: (item) => dispatch(actions.expandItem(item)),
    onLoadMore: (order, after, token) => dispatch(actions.onLoadMore(order, after, token)),
    vote: (id, voteValue, token) => dispatch(actions.vote(id, voteValue, token)),
    onSortChange: (order, token) => dispatch(actions.onSortChange(order, token)),
    fnSetModalItem: (item) => dispatch(actions.setModalItem(item)),
    onCloseModal: () => dispatch(actions.onCloseModal())

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Home, oAuthAxios));
