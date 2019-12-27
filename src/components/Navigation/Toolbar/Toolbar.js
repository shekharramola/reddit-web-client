import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ActionItems from '../ActionItems/ActionItems';

const menuList = [
    {
        id: 'home',
        title: 'Home',
        active: false,
        index: 1
    },
    {
        id: 'popular',
        title: 'Popular',
        active: true,
        index: 2
    },
    {
        id: 'all',
        title: 'All',
        active: false,
        index: 3
    },
    {
        id: 'random',
        title: 'Random',
        active: false,
        index: 4
    },
];


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo height="80%" />
        <NavigationItems menuList={menuList} type="topbar" Incomingclass="NavigationItems"
        />
        <ActionItems />
    </header>
);

export default toolbar;