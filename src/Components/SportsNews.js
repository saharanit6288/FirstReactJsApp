import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from './Shared/Global';
import axios from 'axios';

class SportsNews extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            latestSportNews: []
        };

    }

    componentDidMount() {
        var urlPath = Global.NewsUrl + "v2/top-headlines?country=in&category=sports&page=1&pageSize=40&apiKey=" + Global.NewsApiKey;
    
        axios.get(urlPath)
          .then(res => {
            const latestSportNews = res.data.articles;
            
            this.setState({ latestSportNews });
          })
      }
    
    render() {

    const title ="Latest Sports News";

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
        
                <div class="row">
                {
                    this.state.latestSportNews.map(function(lsn, i){
                        return (
                            <div key={i} class="col-lg-3 col-md-4 col-sm-6 portfolio-item">
                                <div class="card h-100">
                                <a href={lsn.url}><img class="card-img-top" src={lsn.urlToImage} alt="" /></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                    <a href={lsn.url}>{lsn.title}</a>
                                    </h4>
                                    <p class="card-text">
                                        {lsn.description}
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

export default SportsNews;