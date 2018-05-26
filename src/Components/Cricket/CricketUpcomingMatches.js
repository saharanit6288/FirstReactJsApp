import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

import MatchScore from './MatchScore';
import CricketSideBar from './CricketSideBar';

function LiveMatch() {
    return <span class="btn btn-danger btn-sm">LIVE</span>;
}

class CricketUpcomingMatches extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            cricketMatches: [],
            arraySize: 50
        };

    }

    fetchUpcomingMatches()
    {
        var urlPath = Global.CricketApiUrl + "matches?apikey="+Global.CricketApiKey;

        axios.get(urlPath)
        .then(res => {
            
          if(res.data.matches !== undefined){
              const cricketMatches = res.data.matches.slice(0, this.state.arraySize);
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
        this.fetchUpcomingMatches();
    }

    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                Cricket Upcoming Matches
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">Cricket Upcoming Matches</li>
            </ol>

            <div class="row">
                <div class="col-lg-8 mb-4">
                    <div class="mb-4" id="accordion" role="tablist" aria-multiselectable="true">
                        {
                            this.state.cricketMatches.map(function(cricMtch, i){
                                return ( 
                                    <div class="card" key={i}>
                                        <div class="card-header" role="tab" id="headingOne">
                                            <h6 class="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordion" href={"#collapse"+i} aria-expanded="true" aria-controls={"collapse"+i}>
                                                    {cricMtch['team-1']} vs {cricMtch['team-2']}
                                                    &nbsp;-&nbsp;
                                                    {moment.utc(cricMtch.dateTimeGMT).local().format("Do MMM YYYY h:mm:ss a")}
                                                    &nbsp;-&nbsp;
                                                    {cricMtch.type}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {cricMtch.matchStarted === true && <LiveMatch />}
                                                </a>
                                            </h6>
                                        </div>

                                        <MatchScore matchId={cricMtch.unique_id} keyIndex={i} />
                                        
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <CricketSideBar />
            </div>
            
    
        </div>        
      );
    }
}

export default CricketUpcomingMatches;