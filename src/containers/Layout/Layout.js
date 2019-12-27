import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
class Layout extends Component {

    render() {
        return (
            <Aux>
                <Toolbar />

                <main className={classes.Content}>
                    <Sidebar />
                    <div className={classes.MainContent}>

                        {this.props.children}
                    </div>
                </main>
            </Aux>


        );
    }
}

export default Layout;