import React from 'react';
import vector from '../../assets/images/vector.png';
import classes from './Auth.module.css';
import Login from './Login/Login';

const Auth = (props) => {
    return (
      <div className={classes.Flex}>
        <div className={classes.Item1}>
        <img className={classes.Image} src={vector} alt="vectorImage" />
        </div>
        <div className={classes.Item2}><Login/></div>
      </div>
    );
  
    }
    export default Auth;