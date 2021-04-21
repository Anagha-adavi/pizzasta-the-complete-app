import React, { Component } from 'react';
import axios from '../../axios';
import classes from './detail_food.css';
import Aos from "aos";
import  "aos/dist/aos.css";
import Loader from '../../UI/Loader/loader';
import {Link} from 'react-router-dom';

class detail_food extends Component {

    state={
        food:{}
    }

    async componentDidMount(){
        Aos.init({duration:2000});
        const result = await axios.get(`/api/v1/food/${this.props.match.params.food_id}`)
        this.setState({food:result.data.data.food})
    }
    render() {
        return (
           Object.keys(this.state.food).length===0?
           (<div style={{backgroundColor: 'rgb(2, 14, 65)',height:"100vh"}}>
                <Loader/>
            </div>):
            (
                    <div className={classes.detailed_body}>
                        <div className={classes.detailed_box}>
                            <div className={classes.title}>{this.state.food.title}</div>
                            <div className={classes.pic_container}>
                                <img src={process.env.PUBLIC_URL+`/${this.state.food.imageCover}`} className={classes.pic}/> 
                            </div>
                            <div className={classes.desc}>{this.state.food.description}</div>
                            <div className={classes.ingre_cont} >
                                <h2 className={classes.heading1}>Ingredients</h2>
                                <h2 className={classes.heading}>Serves : {this.state.food.serves}</h2>
                                <h2 className={classes.heading}>Preparation Time : {this.state.food.prepTime}</h2>
                                <div className={classes.ing_container}>
                                    
                                    {this.state.food.ingredients.map((ingre,index)=>{
                                        return (
                                            <div className={classes.ing}>{index+1} . {ingre}</div>
                                        )
                                    })} 
                                </div>
                            </div>
                            
                            <h2 className={classes.title}>Gallery</h2>
                            <div className={classes.images}>
                                    {this.state.food.images.map((img)=>{
                                        return <img src={process.env.PUBLIC_URL+`/${img}`} className={classes.img}/>  
                                    })}
                            </div>
                            <h2 className={classes.title}>Reviews And Ratings</h2>
                            {this.state.food.reviews.length===0?<h2 style={{color:"rgb(2, 14, 65)",fontWeight:"600"}}>No Reviews Yet</h2>:
                            (<div className={classes.review_body}>
                                {this.state.food.reviews.map((review)=>
                                        (<div className={classes.review_box}>
                                            <div>Review : {review.review}</div>
                                            <div>Reviewed By : {review.user!==null?review.user.name:null}</div>
                                            <div>Rating : {review.rating!==null?review.rating:null}</div>
                                        </div>)    
                                )}
                            </div>)}
                            <h2 style={{color:"white"}}>Only for {this.state.food.price} /-</h2>
                            <div className={classes.cart_btn_container} >
                            <Link to={`/food/${this.state.food.id}/cart`} className={classes.cart_btn}>Add to cart</Link>
                            </div>
                    </div>
                    </div>
            )
        );
    }
}

export default detail_food;
