import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';

import CricketSideBar from './CricketSideBar';

class CricketMatchCalender extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            cricketMatches: [],
        };

    }

    fetchMatchCalender()
    {
        var urlPath = Global.CricketApiUrl + "matchCalendar?apikey="+Global.CricketApiKey;

        axios.get(urlPath)
        .then(res => {
          if(res.data.data !== undefined){
              const cricketMatches = res.data.data;

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
        this.fetchMatchCalender();
    }

    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                Cricket Match Calender
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item">
                <Link to="/cricket-updates">Cricket</Link>
            </li>
            <li class="breadcrumb-item active">Cricket Match Calender</li>
            </ol>
            <h3>Match Calender</h3>

            <div class="row">
                <div class="col-lg-8 mb-4">
                    <div class="list-group">
                    {
                        this.state.cricketMatches.map(function(cricMtch, i){
                            return ( 
                                <Link to="#" class="list-group-item" key={i}>
                                    {cricMtch.date} - {cricMtch.name}
                                </Link>
                            )
                        })
                    }
                    </div> 
                </div>
                <CricketSideBar />
            </div>
            <br />
        </div>        
      );
    }
}

export default CricketMatchCalender;