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
            this.setState({color:"transparent"})

        }
      }
    
      componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
      }
    

    render() {
        return (
            <header className={this.state.color==="transparent"?classes.header_transparent:classes.header_on_scroll}>
                <div className={classes.heading_image}>
                <img src=
                'https://media.istockphoto.com/vectors/fresh-pizza-with-tomato-cheese-olive-sausage-onion-vector-id1082045162?s=612x612' 
                className={classes.logo} />
                <h3 className={classes.app_name_heading}>pizzasta</h3>
            </div>
                {/* <input type="text" placeholder="SEARCH....." defaultValue="" className={classes.search_bar} /> */}
                <div className={classes.nav}>
                    <Link to='/' className={classes.link}>Home</Link>
                    <Link to='/explore' className={classes.link}>Explore</Link>
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
