import React from 'react';

import Logo from '../../assets/images/logo-with-text.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={Logo} alt="myburger" />
    </div>

);

export default logo;