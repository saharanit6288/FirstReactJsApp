import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Contact extends Component {
    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                Contact Us
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">Contact</li>
            </ol>
    
            <p>
                Contact at: 9830477835 / saharanit321@gmail.com
            </p>
    
        </div>        
      );
    }
}

export default Contact;