import React, { Component } from 'react';

// import Temperature from '../Temperature';
import Carousel  from './Carousel';
import Features from './Features';
import Headlines from './Headlines';


class Home extends Component {
    render() {
      return (
        <div>
            <Carousel />
            <div class="container">
                <Features />
                <Headlines />
            </div>
        </div>
      
      );
    }
}

export default Home;