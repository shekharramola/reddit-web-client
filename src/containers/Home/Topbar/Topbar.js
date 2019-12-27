import classes from "./Topbar.module.css";

import React from 'react';
import {
  MdKeyboardBackspace,
  MdViewAgenda,
  MdDashboard,
  MdAddCircleOutline,
} from 'react-icons/md';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';




const Topbar = (props) => (

  <div className={classes.TopbarWrapper}>

    <div className={classes.Leftside}>
      <span onClick={props.history.goBack}>
        <MdKeyboardBackspace />
      </span>
      {props.order}

    </div>
    <div className={classes.Rightside}>
      <div className={classes.SelectboxWrapper}>
        {props.order}
        <select className={classes.selectBox}>
          <option value="US">US</option>
        </select>

        <select className={classes.selectBox}>
          <option value="ALL">All states</option>
        </select>
        <span className={classes.Filter}>
          <span className={classes.FilterItem}><MdViewAgenda /></span>
          <span className={classes.FilterItem}><MdDashboard /></span>
        </span>
      </div>

      <Button btnType="Danger" width="27%" ><MdAddCircleOutline />SUBMIT</Button>
    </div>
  </div>
)


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    order: state.home.sort
  }
}

export default withRouter(connect(mapStateToProps, null)(Topbar));