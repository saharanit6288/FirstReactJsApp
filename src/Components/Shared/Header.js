import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container">
                    <Link to="/" class="navbar-brand">Sports Updater</Link>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <Link to="/about" class="nav-link">About</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/sports-news" class="nav-link">Sports News</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/football-updates" class="nav-link">Football</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/cricket-updates" class="nav-link">Cricket</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/events" class="nav-link">Events</Link>
                        </li>
                        {/* <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Updates
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                            <Link to="/football" class="dropdown-item">Football</Link>
                            <Link to="/cricket" class="dropdown-item">Cricket</Link>
                        </div>
                        </li> */}
                        <li class="nav-item">
                            <Link to="/contact" class="nav-link">Contact</Link>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;