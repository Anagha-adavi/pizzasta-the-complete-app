import React, { Component } from 'react';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import {Switch,Redirect,Route} from 'react-router-dom';
import Login from './containers/Auth/Login/login';
import Explore from './containers/Explore/explore';
import {connect} from 'react-redux';
import * as actions from './store/actions/authActions';
import Detail_food from './containers/detail_food/detail_food';
import Cart from './containers/Cart/Cart';
import Logout from './containers/Auth/Logout/logout';

class App extends Component {


  async componentDidMount(){
    const token=localStorage.getItem("user_token")
    const id=localStorage.getItem("user_id")
    const role=localStorage.getItem("user_role")

    if(token){
        this.props.onSubmitAuth(id,token,role)
    }
  }
  render() {
    let component=(
      <Switch>
        <Route path='/login' component={Login} />
        <Redirect to='/login' />

      </Switch>
    )

    if(this.props.user_token){
      console.log("yes")
      component=(
        <Switch>
              <Route path='/login' component={Login} />
              <Route path='/explore' component={Explore} />
              <Route path='/' exact component={Home} />
              <Route path='/detail/:food_id'  component={Detail_food} />
              <Route path='/food/:food_id/cart'  component={Cart} />
              <Route path='/cart' component={Cart} />
              <Route path='/logout' component={Logout} />
              <Redirect to='/' />
            </Switch>
      )
    }
    return (
      <div className={classes.App}>
          <Layout>
            {component}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    user_token:state.auth.user_token
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    onSubmitAuth:(id,token,role)=>dispatch(actions.authSuccess(id,token,role))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
