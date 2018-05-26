import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';

//import PlayerSuggestions from './PlayerSuggestions';

class CricketSideBar extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            query: '',
            players: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
      }
    
    handleSubmit(event) {
        this.fetchPlayers(this.state.query);
        event.preventDefault();
    }
    
    // handleInputChange(event) {
    //     this.setState({
    //         query: this.search.value
    //       }, () => {
    //         if (this.state.query && this.state.query.length > 1) {
    //           if (this.state.query.length % 2 === 0) {
    //             this.fetchPlayers();
    //           }
    //         } else if (!this.state.query) {
    //         }
    //       })
    // }


    fetchPlayers(srchTxt)
    {
        var urlPath = Global.CricketApiUrl + "playerFinder?name="+srchTxt+"&apikey="+Global.CricketApiKey;

        axios.get(urlPath)
          .then(res => {
              
            if(res.data !== undefined){
                const players = res.data.data;
                //console.log(players);
                this.setState({ players });
              }
              else{
                this.setState({ players: [] });
              }
          })
          .catch(error => {
            this.setState({ players: [] });
          })
    }

    componentDidMount() {
        //this.fetchPlayers(this.state.query);
    }

    render() {
      return (   
            <div class="col-lg-4 mb-4">
                <div class="card mb-4">
                    <h5 class="card-header">Search Players</h5>
                    <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                    <div class="input-group">
                        {/* <input type="text" 
                            class="form-control" 
                            placeholder="Search for..."
                            ref={input => this.search = input}
                            onChange={this.handleInputChange} /> */}
                        <input type="text" 
                            class="form-control" 
                            placeholder="Search for..."
                            value={this.state.query} 
                            onChange={this.handleChange} />
                        <span class="input-group-btn">
                            <button class="btn btn-secondary" type="button">Go!</button>
                        </span>
                    </div>
                    </form>
                    </div>
                    <div class="card-footer">                       
                        <ol>
                            {
                                this.state.players.map(function(res, i){
                                    return ( 
                                        <li key={i}>
                                            <Link to={`/cricket-updates/player/${res.pid}`}>
                                                {res.fullName}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        {/* <PlayerSuggestions results={this.state.players} /> */}
                    </div>
                </div>
                <div class="card my-4">
                    <h5 class="card-header">Other Links</h5>
                    <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6">
                        <ul class="list-unstyled mb-0">
                            <li>
                                <Link to="/cricket-updates">Upcoming Matches</Link>
                            </li>
                            <li>
                                <Link to="/cricket-match-calender">Match Calender</Link>
                            </li>
                            <li>
                                <Link to="/cricket-old-matches">Archive Matches</Link>
                            </li>
                        </ul>
                        </div>
                        
                    </div>
                    </div>
                </div>

            </div> 
        );
    }
}

export default CricketSideBar;