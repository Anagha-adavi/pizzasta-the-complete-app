import React, { PureComponent } from 'react';
import classes from './Cart.css';
import axios from '../../axios';
import {connect} from 'react-redux';
import Loader from '../../UI/Loader/loader';
import {Link} from 'react-router-dom'
class Cart extends PureComponent {

    state={
        cartItems:[],
        totalItemsInCart:0,
        totalPrice:0,
        request_made:false,
        done_creation:false
    }


    

    async componentDidMount(){
        const AuthStr = 'Bearer ' + this.props.user_token;
        
        //get the cart items
        const response =await axios.get('api/v1/cart', { 'headers': { 'Authorization': AuthStr }});
        
        if(this.props.match.url==="/cart")
        {
            if(response.data.data.cartItems.length!==0){
                    this.setState(
                        {
                            cartItems:response.data.data.cartItems,
                            totalItemsInCart:response.data.totalItemsInCart,
                            totalPrice:response.data.totalPrice,
                            request_made:true,
                            done_creation:true

                        })
                }
                else{
                    this.setState({...this.state,request_made:true})
                }
        }
        else
        {
            console.log("carted an item")
            let food_ids=[]   

        //add the item to cart
        if(response.data.totalItemsInCart===0)
            {
                const result_of_first_time=await axios.post(`api/v1/food/${this.props.match.params.food_id}/cart`,null,
                { 'headers': { 'authorization': AuthStr }}
                );
                const response =await axios.get('api/v1/cart', { 'headers': { 'Authorization': AuthStr }});
                this.setState(
                    {
                        cartItems:response.data.data.cartItems,
                        totalItemsInCart:response.data.totalItemsInCart,
                        totalPrice:response.data.totalPrice,
                        request_made:true,
                        done_creation:true


                    })
            }
            else{

                //check if id posted is present in cart
                response.data.data.cartItems.map((cart)=>{
                    food_ids.push(cart.food.id)
                })


                if(food_ids.includes(this.props.match.params.food_id))
                {
                    //if it is included in array then update the quantity
                    const result_of_updation=await axios.patch(`api/v1/food/${this.props.match.params.food_id}/cart`,null,
                        { 'headers': { 'authorization': AuthStr }}
                    );
                    const response =await axios.get('api/v1/cart', { 'headers': { 'Authorization': AuthStr }});
                    console.log(response,"updation")
                this.setState(
                    {
                        cartItems:response.data.data.cartItems,
                        totalItemsInCart:response.data.totalItemsInCart,
                        totalPrice:response.data.totalPrice,
                        request_made:true,
                        done_creation:true


                    })
                }

                
                else{
                    //add the item to cart
                    const result_of_adding_new_item=await axios.post(`api/v1/food/${this.props.match.params.food_id}/cart`,null,
                    { 'headers': { 'authorization': AuthStr }}
                    );
                    const response =await axios.get('api/v1/cart', { 'headers': { 'Authorization': AuthStr }});
                    console.log(response,"creation")
                    this.setState(
                        {
                            cartItems:response.data.data.cartItems,
                            totalItemsInCart:response.data.totalItemsInCart,
                            totalPrice:response.data.totalPrice,
                            request_made:true,

                        })           
                }
            }
        }
    }

    render() {
        return (
                    this.state.request_made===false?
                    (
                    <div style={{backgroundColor: 'rgb(2, 14, 65)',height:"100vh"}}>
                        <Loader/>
                    </div>):
                    <div className={classes.container}>
                        <div className={classes.summary}>
                            <div className={classes.sum_total}>Total item on cart : {this.state.totalItemsInCart} </div>
                            <div className={classes.price_total}>Total Price : {this.state.totalPrice} /-</div>
                        </div>
                        
                        <div className={classes.box}>
                        {   this.state.cartItems.length===0 ?<div style={{color:"white",textAlign:"enter"}}> Your Cart feels light  </div>:
                            this.state.cartItems.map((item)=>{
                                    return (
                                        <div className={classes.cart_item_box}>
                                            <div className={classes.title}>
                                                Item : {item.food.title}
                                            </div>
                                            <div>
                                                Price : {item.price}
                                            </div>
                                            <div>
                                                Quantity : {item.quantity}
                                            </div>    
                                                <Link to='/' className={classes.delete_btn}>Delete</Link>
                                        </div>
                                    )
                            })
                        }
                        </div>
                    </div>
            
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        user_token:state.auth.user_token
    };
}

export default connect(mapStateToProps)(Cart);
