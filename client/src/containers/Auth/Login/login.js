import React, { Component } from 'react';
import classes from './login.css';
import {Redirect,Link} from 'react-router-dom';
import axios from '../../../axios';
import Loader from '../../../UI/Loader/loader';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/authActions';


class login extends Component {

    state={
        credentials:{
            email:null,
            password:null
        }
    }

    inputChangedHandler=(event,field)=>{
        let credentials={...this.state.credentials}
        if(field==="email"){
            let email=event.target.value
            credentials.email=email
        }
        else{
            let password=event.target.value
            credentials.password=password
        }
        this.setState({credentials})

    }

    onSubmitHandler=(event)=>{
       
        event.preventDefault();
        const  credentials={
            ...this.state.credentials
        }
        
        console.log(credentials)
        this.props.onSubmit(credentials)
    
    }

    render() {
        let component=(
            <div className={classes.login_body} onSubmit={(event)=>this.onSubmitHandler(event)}>
               <form id='form' className={classes.container}>
                    <h3 style={{color:"black",fontFamily:"sans-serif",textAlign:"center",padding:"20px"}}>Login</h3>
                   <div className={classes.form_control}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="username" placeholder="Enter email" onChange={(event)=>this.inputChangedHandler(event,"email")}
                        defaultValue=""/>
                   </div>
                   <div className={classes.form_control}>
                   <label htmlFor="password">password</label>
                        <input type="password" id="password" placeholder="Enter password"
                        onChange={(event)=>this.inputChangedHandler(event,"password")}
                        defaultValue=""/>
                   </div>
                   <div style={{margin:"0 auto"}}>
                        <button type="submit" className={classes.Login_button}>Login</button>
                   </div>
               </form>
               </div>
            
        );

        if(this.props.user_token){
            component=<Redirect to='/' />
        }
        return (
            <div>
                {component}
            </div>
        );
    }
}


const mapStateToProps=(state)=>{
    return {
        user_token:state.auth.user_token,
        user_id:state.auth.user_id,
        user_role:state.auth.user_role
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onSubmit:(credentials)=>{
            return dispatch(actions.authInit(credentials,"login"))}
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(login);
