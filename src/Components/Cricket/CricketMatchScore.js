import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import Global from '../Shared/Global';
import axios from 'axios';

class CricketMatchScore extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            info: {},
            matchId: props.match.params.matchId
        };

    }

    fetchMatchScoreInfo(matchId)
    {
        var urlPath = Global.CricketApiUrl + "cricketScore?unique_id="+matchId+"&apikey="+Global.CricketApiKey;

        axios.get(urlPath)
          .then(res => {
              
            if(res.data !== undefined){
                const info = res.data;
                //console.log(info);
                this.setState({ info });
              }
              else{
                this.setState({ info: {} });
              }
          })
          .catch(error => {
            this.setState({ info: {} });
          })
    }

    componentDidMount() {
        this.fetchMatchScoreInfo(this.state.matchId);
    }

    render() {
      return (            
            <div class="container">

                <h1 class="mt-4 mb-3">
                    Match Info
                </h1>

                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <Link to="/cricket-updates">Cricket</Link>
                </li>
                <li class="breadcrumb-item active">Match Details</li>
                </ol>

                {
                    <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2>
                            {this.state.info['team-1']} vs {this.state.info['team-2']}
                        </h2>
                        <hr />
                        <p>
                            {this.state.info.score}
                        </p>
                        <hr />
                        <p>
                            {this.state.info.description}
                        </p>
                        <hr />
                        <p>
                            {this.state.info.stat}
                        </p>
                    </div>
                </div>
                }  
            </div>
        );
    }
}

export default CricketMatchScore;