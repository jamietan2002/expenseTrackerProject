import React, { Component } from 'react';
import {Nav,Navbar,NavItem,NavbarBrand, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

import Category from './Category';
import Expense from './Expense';
import './AppNav.css';



class AppNav extends Component {
    state = {  }
    render() {
        return (
            <nav className="navbar">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-text">Expense Tracker</span>

                    </li>
                  </ul>
                </nav>
              );
      }
}

export default AppNav;