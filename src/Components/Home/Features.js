import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Features extends Component {
    render() {
      return (
        <div>
            <h1 class="my-4">Welcome to Sports Updater</h1>

            <div class="row">
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                <h4 class="card-header">Explore Sports News</h4>
                <div class="card-body">
                    <p class="card-text">Explore news of sports all around the world in a minute.</p>
                </div>
                <div class="card-footer">
                    <Link to="/sports-news" class="btn btn-primary">Explore More</Link>
                </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                <h4 class="card-header">Football Updates</h4>
                <div class="card-body">
                    <p class="card-text">Explore latest updates on football all over the world.</p>
                </div>
                <div class="card-footer">
                    <Link to="/football" class="btn btn-primary">Explore More</Link>
                </div>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="card h-100">
                <h4 class="card-header">Cricket Updates</h4>
                <div class="card-body">
                    <p class="card-text">Explore latest updates on cricket all over the world.</p>
                </div>
                <div class="card-footer">
                    <Link to="/cricket" class="btn btn-primary">Explore More</Link>
                </div>
                </div>
            </div>
            </div>
            
        </div>
      
      );
    }
}

export default Features;