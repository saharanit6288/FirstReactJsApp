import React, { Component } from 'react';
import Temperature from './Temperature';

class Content extends Component {
    render() {
      return (
            
        <div class="container">

            <h1 class="mt-4 mb-3">
                Temperature Calculator
            </h1>
            <p>
                <Temperature />
            </p>
        </div>
        
        );
    }
}

export default Content;