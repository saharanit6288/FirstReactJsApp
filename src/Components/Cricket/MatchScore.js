import React, { Component } from 'react';
import Global from '../Shared/Global';
import axios from 'axios';

class MatchScore extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            info: {},
            matchId: props.matchId,
            keyIndx: props.keyIndex
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
            <div id={"collapse"+this.state.keyIndx} class="collapse" role="tabpanel" aria-labelledby="headingOne">                
                <div class="card-body">
                    <p>
                        {this.state.info.score}
                    </p>
                    {/* <hr />
                    <p>
                        {this.state.info.description}
                    </p>
                    <hr />
                    <p>
                        {this.state.info.stat}
                    </p>                                */}
                </div>  
            </div>  
        );
    }
}

export default MatchScore;