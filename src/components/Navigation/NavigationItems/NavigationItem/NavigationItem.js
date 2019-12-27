import React from 'react';
import classes from './NavigationItem.module.css';


const navigationItem = (props) => {

    const navClasses = [classes.Anchor];
    if (props.item.active) {
        navClasses.push(classes.Active)
    }
    return (
         <a className={navClasses.join(' ')} href={"/home?sort="+props.item.id} >{props.item.title}</a>
    )
}




export default navigationItem;