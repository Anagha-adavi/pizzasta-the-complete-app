import React,{Component} from 'react';
import Navigation from '../../components/Navigation/Navigation'

class Layout extends Component {
    render() {
        return (

            <div>
                <header>
                    <Navigation />
                </header>
                <main>
                    {this.props.children} 
                </main>
            </div>
        );
    }
}

export default Layout;
