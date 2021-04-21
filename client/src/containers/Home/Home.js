import React, { Component } from 'react';
import classes from './Home.css';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className={classes.home}>
                <h3 className={classes.app_name_heading}>pizzasta</h3>
                <Link to='/explore' className={classes.moto}>Explore our dishes</Link>
                {/* <h2 className={classes.motos}>Premium Quality delicacy</h2> */}
            </div>
        );
    }
}

export default Home;
