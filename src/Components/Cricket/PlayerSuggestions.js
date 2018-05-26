import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayerSuggestions extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            results: props.results
        };
        
    }

    componentDidMount() {
        //this.fetchMatchScoreInfo(this.state.matchId);
        console.log(this.state.results);
    }

    render() {
      return (   
            <ul>
                {
                    this.state.results.map(function(res, i){
                        return ( 
                            <li key={i}>
                                <Link to={`/cricket-updates/player/${res.pid}`}>
                                    {res.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export default PlayerSuggestions;