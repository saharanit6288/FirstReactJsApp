import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class About extends Component {
    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                About Us
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">About</li>
            </ol>
    
            <p>
                Coming soon.
            </p>
    
        </div>        
      );
    }
}

export default About;