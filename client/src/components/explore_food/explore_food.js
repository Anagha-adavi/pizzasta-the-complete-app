import React from 'react';
import classes from './explore_food.css';
import Loader from '../../UI/Loader/loader';
import {Link} from 'react-router-dom';

const explore_food = (props) => {
   
    const onClickHandler=()=>{
        // console.log("clicked")
    }

    return (
        <div className={classes.food_box} key={props.uniq}>
            <div >
               <div >
                   <img src={process.env.PUBLIC_URL+`./${props.food_cover_img}`} className={classes.cover_img}/>
               </div>
            </div>
            <div className={classes.food_heading}> {props.food_title}</div>
            <div className={classes.food_price}>Price : {props.food_price} /-</div>  
            <div className={classes.food_rating}>Ratings : {props.food_rating}</div>   
            <Link to={`/detail/${props.food_id}`} className={classes.detail_btn} onClick={onClickHandler}>
                <div className={classes.detail_text}>Details</div>
            </Link>       
        </div>
    );
}

export default explore_food;
