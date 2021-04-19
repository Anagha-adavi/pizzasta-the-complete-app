import React, { Component } from 'react';
import Explore_food from '../../components/explore_food/explore_food';
import axios from '../../axios';
import classes from './explore.css';
import {connect} from 'react-redux';
import Loader from '../../UI/Loader/loader';

class explore extends Component {

    state={
        foods:[]
    }

    async componentDidMount(){
        const AuthStr = 'Bearer ' + this.props.user_token;
        const result=await axios.get("api/v1/food",{ 'headers': { 'authorization': AuthStr }})
        console.log()
        this.setState({foods:result.data.data.foods})
    }
    render() {
        let component;
        if(this.state.foods.length===0){console.log("A");
        component=(
        <div style={{backgroundColor: 'rgb(2, 14, 65)',height:"100vh"}}>
            <Loader/>
        </div>)};

        if(this.state.foods.length!==0){
            console.log("B")
            component=  
            (<div className={classes.explore_body}>
            {this.state.foods.map((food,index)=>{
                return <Explore_food food_title={food.title} 
                food_rating={food.ratingsAverage} 
                food_cover_img={food.imageCover} 
                uniq={index} 
                food_price={food.price} food_id={food.id}/>
            })}
            </div>)
        }
        return (
          <div>
              {component}
          </div>
        );
    }
}

const mapStateTpProps=(state)=>{
    return {
        user_token:state.auth.user_token
    }
}

export default connect(mapStateTpProps)(explore);
