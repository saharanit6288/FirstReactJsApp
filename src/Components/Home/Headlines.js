import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';

class Headlines extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            sportNews: []
        };

    }

    componentDidMount() {
        var urlPath = Global.NewsUrl + "v2/top-headlines?country=in&category=sports&page=1&pageSize=3&apiKey=" + Global.NewsApiKey;
    
        axios.get(urlPath)
          .then(res => {
            const sportNews = res.data.articles;
            
            this.setState({ sportNews });
          })
    }
    
    render() {
      return (
        <div>
            <div class="row">
                <div class="col-lg-10 col-sm-10">
                    <h2>Top Sports Headlines</h2>
                </div>
                <div class="col-lg-2 col-sm-2">
                    <Link to="/sports-news"  class="btn btn-secondary btn-block">View All</Link>
                </div>
            </div>
            <div class="row">
            {
                this.state.sportNews.map(function(sn, i){
                    return (
                        <div key={i} class="col-lg-4 col-sm-6 portfolio-item">
                            <div class="card h-100">
                            <a href={sn.url}><img class="card-img-top" src={sn.urlToImage} alt="" /></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                <a href={sn.url}>{sn.title}</a>
                                </h4>
                                <p class="card-text">
                                    {sn.description}
                                </p>
                            </div>
                            </div>
                        </div>
                    )
                })
            }   
            </div>
        </div>
      
      );
    }
}

export default Headlines;