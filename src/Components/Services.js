import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Services extends Component {
    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                Services
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">Services</li>
            </ol>
    
            <p>
                Our Services are coming soon.
            </p>
    
        </div>        
      );
    }
}

export default Services;