import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';

import CricketSideBar from './CricketSideBar';

class CricketOldMatches extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            cricketMatches: [],
        };

    }

    fetchOldMatches()
    {
        var urlPath = Global.CricketApiUrl + "cricket?apikey="+Global.CricketApiKey;

        axios.get(urlPath)
        .then(res => {
          if(res.data.data !== undefined){
              const cricketMatches = res.data.data;
              //console.log(cricketMatches);
              this.setState({ cricketMatches });
            }
            else{
              this.setState({ cricketMatches: [] });
            }
        })
        .catch(error => {
          this.setState({ cricketMatches: [] });
        })

    }

    componentDidMount() {
        this.fetchOldMatches();
    }

    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                Cricket Archive Matches
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item">
                <Link to="/cricket-updates">Cricket</Link>
            </li>
            <li class="breadcrumb-item active">Cricket Archive Matches</li>
            </ol>
            <h3>Archive Matches</h3>

            <div class="row">
                <div class="col-lg-8 mb-4">
                    {
                       this.state.cricketMatches.map(function(cricMtch, i){
                            return ( 
                                <div class="card mb-4" key={i}>
                                    <div class="card-body">
                                    <h2 class="card-title">{cricMtch.title}</h2>
                                    <p class="card-text">
                                        {cricMtch.description}
                                    </p>
                                    <Link to={`/cricket-updates/score/${cricMtch.unique_id}`} class="btn btn-primary">
                                        Read More &rarr;
                                    </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <CricketSideBar />
            </div>
            <br />
        </div>        
      );
    }
}

export default CricketOldMatches;