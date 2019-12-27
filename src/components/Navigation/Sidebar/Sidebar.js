import React, { Component } from 'react';
import {
  FaHotjar, FaRegListAlt, FaRegChartBar,
  FaTrophy, FaRegStar, FaRegNewspaper,
} from 'react-icons/fa';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidebar.module.css';
import { getQueryParam } from '../../../utility';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
const menuList = [
  {
    id: 'hot',
    title: 'Hot',
    icon: <FaHotjar />,
    active: true,
    index: 11
  },

  {
    id: 'new',
    title: 'New',
    icon: <FaRegListAlt />,
    active: false,
    index: 12
  },
  {
    id: 'rising',
    title: 'Rising',
    icon: <FaRegChartBar />,
    active: false,
    index: 13
  },
  {
    id: 'top',
    title: 'Top',
    icon: <FaTrophy />,
    active: false,
    index: 14
  },
  {
    id: 'glided',
    title: 'Glided',
    icon: <FaRegStar />,
    active: false,
    index: 15
  },
  {
    id: 'wiki',
    title: 'Wiki',
    icon: <FaRegNewspaper />,
    active: false,
    index: 16
  },
  {
    id: 'favs',
    title: 'Favs',
    icon: <FaRegNewspaper />,
    active: false,
    index: 16
  }
];

class Sidebar extends Component {



  addActive(order) {
    menuList.forEach(elm => {
      if (elm.id === order) {
        elm.active = true;
      } else {
        elm.active = false;
      }
    })
  }

  render() {
    const order = getQueryParam(this.props.location.search, 'sort');
    this.addActive(order);
    return (
      <aside className={classes.Sidebar}>

        <NavigationItems menuList={menuList} type="sidebar"
          Incomingclass="SidebarNavigationItems"
        />
      </aside>
    )
  }

}


const mapStateToProps = state => {
  return {
    token: state.auth.token || localStorage.getItem('token')
  }
}



export default withRouter(connect(mapStateToProps, null)(Sidebar));

