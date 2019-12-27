import { MdSearch, MdNotificationsNone } from 'react-icons/md';
import React from 'react';
import classes from './ActionItems.module.css';
import Avatar from '../../Avatar/Avatar';
import { withRouter } from 'react-router';

function logout() {
    localStorage.clear();
    window.location.href = '/';
}

const actionItems = (props) => (
    <div className={classes.ActionWrapper}>

        <a href="search"><MdSearch /></a>
        <a href="notification"><MdNotificationsNone /></a>
        <div className={classes.Profile} onClick={logout}>
            <Avatar /><div className={classes.Userinfo}>
                <span className={classes.Name}>
                    shekhar
        </span>
                <span className={classes.Email}>
                    shekhar@gmail.com
        </span>
            </div>
        </div>
    </div>
)


export default withRouter(actionItems);