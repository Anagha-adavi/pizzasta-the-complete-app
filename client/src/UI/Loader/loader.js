import React from 'react';
import classes from './loader.css'

const loader = () => {
    return (
        
            <div className={classes.lds_ring}><div></div><div></div><div></div><div></div></div>
        
    );
}

export default loader;
