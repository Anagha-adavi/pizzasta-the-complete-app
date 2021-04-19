import React,{Component} from 'react';
import classes from './Navigation.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Navigation extends Component {

    state={
        color:"transparent"
    }

    listenScrollEvent = e => {
        if (window.scrollY > 30) {
          this.setState({color:" rgb(3, 3, 56)"})
        } 
        else{
            this.setState({color:" transparent"})

        }
      }
    
      componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
      }
    

    render() {
        return (
                <header style={{backgroundColor:this.state.color,
                    position: "fixed",
                    top: "0",
                    left: "0",
                    zIndex: "100",
                    padding: "10px",
                    fontSize: "20px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-around",
                    width: "100%"}}>
                <div className={classes.heading_image}>
                <img src=
                'https://media.istockphoto.com/vectors/fresh-pizza-with-tomato-cheese-olive-sausage-onion-vector-id1082045162?s=612x612' 
                className={classes.logo} />
                <h3>pizzasta</h3>
            </div>
                <input type="text" placeholder="SEARCH....." defaultValue="" className={classes.search_bar} />
                <div className={classes.nav}>
                    <Link to='/' className={classes.link}>Home</Link>
                    <Link to='/' className={classes.link}>About Us</Link>
                    {!this.props.user_token? (<Link to='/login' className={classes.link}>Login</Link>):<Link to='/cart' className={classes.link}>Cart</Link>}
                    {this.props.user_token? (<Link to='/logout' className={classes.link}>Logout</Link>):null}
                </div>
        </header>
            
        );
    }
}



const mapStateToProps=(state)=>{
    return {user_token:state.auth.user_token}
}
export default connect(mapStateToProps)(Navigation);
