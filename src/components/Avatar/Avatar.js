import React from 'react';

import Logo from '../../assets/images/avatar.jpeg';
import classes from './Avatar.module.css';

const avatar = (props) => (
        <figure className={classes.Figure}>
                <img className={classes.Image} src={Logo} alt="logo" />
        </figure>


);

export default avatar;