import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CricketUpdates extends Component {
    render() {

    const title ="Cricket Updates";

      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                {title}
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">{title}</li>
            </ol>
    
            <p>
                Coming soon.
            </p>
    
        </div>        
      );
    }
}

export default CricketUpdates;