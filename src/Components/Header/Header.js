import React, {Component} from 'react';

import './Header.css';

import logo from '../../assets/shelfie_icon.png';

class Header extends Component {

render() {
    return(
        <div className="app-header">
            <img className="logo" src={logo} alt="logo"/>
            <h1 >Shelfie</h1>
        </div>
    );
}

}

export default Header;