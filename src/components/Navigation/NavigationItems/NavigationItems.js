import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';



const navigationItems = (props) => {

    let menuItems = props.menuList.map(item => (
        <NavigationItem key={item.id} item={item} type={props.type} 
        
        />

    ));
    return (
        <div className={classes[props.Incomingclass]}>
            {menuItems}
        </div>
    )
}

export default navigationItems;