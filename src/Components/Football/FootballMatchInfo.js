import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class FootBallMatchInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            matches: [],
            matchId: props.match.params.matchId
        };

    }

    fetchMatch(matchId){
        var urlPath = Global.FootballUrl + "?action=get_events&match_id="+matchId+"&APIkey=" + Global.FootballApiKey;
        console.log(urlPath);        
        axios.get(urlPath)
          .then(res => {
              if(!res.data.error){
                const matches = res.data;
                
                this.setState({ matches });
              }
              else{
                this.setState({ matches: [] });
              }
          })
          .catch(error => {
            this.setState({ matches: [] });
          })
    }


    componentDidMount() {
        this.fetchMatch(this.state.matchId);
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
                <Link to="/football">Football</Link>
            </li>
            <li class="breadcrumb-item active">Match Info</li>
            </ol>

            {
                this.state.matches.map(function(match, i){
                    return (
                        <div class="row" key={i}>
                            <div class="col-lg-12 text-center">
                                <h2>{match.country_name}&nbsp;-&nbsp;{match.league_name}</h2>
                                <hr />
                                <h3>
                                    {match.match_hometeam_name}
                                    &nbsp; 
                                    {match.match_hometeam_score}
                                    &nbsp;-&nbsp;
                                    {match.match_awayteam_score}
                                    &nbsp;
                                    {match.match_awayteam_name}
                                </h3>
                                <p>
                                    {moment(match.match_date).format("Do MMM YYYY")}
                                    &nbsp;
                                    {match.match_time} 
                                </p>
                                <hr />
                                <Tabs>
                                    <TabList>
                                        <Tab>Goals</Tab>
                                        <Tab>Cards</Tab>
                                        <Tab>{match.match_hometeam_name} LineUp</Tab>
                                        <Tab>{match.match_awayteam_name} LineUp</Tab>
                                    </TabList>
                                    <TabPanel tabalign="center">
                                        {
                                            match.goalscorer.map(function(goal, j){
                                                return (
                                                    <p>
                                                        <div class="row" key={j}>
                                                            <div class="col-lg-4">
                                                                {goal.home_scorer}
                                                            </div>
                                                            <div class="col-lg-4">
                                                                {goal.time}
                                                                <br />
                                                                {goal.score}
                                                            </div>
                                                            <div class="col-lg-4">
                                                                {goal.away_scorer}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </p>
                                                )
                                            })
                                        }
                                    </TabPanel>
                                    <TabPanel tabalign="center">
                                        {
                                            match.cards.map(function(card, k){
                                                return (
                                                    <p>
                                                        <div class="row" key={k}>
                                                            <div class="col-lg-4">
                                                                {card.home_fault}
                                                            </div>
                                                            <div class="col-lg-4">
                                                                {card.time}
                                                                <br />
                                                                {card.card}
                                                            </div>
                                                            <div class="col-lg-4">
                                                                {card.away_fault}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </p>
                                                )
                                            })
                                        }
                                    </TabPanel>
                                    <TabPanel tabalign="center">
                                        <h3>Starting Lineups:</h3>
                                        {
                                            match.lineup.home.starting_lineups.map(function(lineup, m){
                                                return (
                                                    <p key={m}>
                                                        {lineup.lineup_number}.{lineup.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                        <hr />
                                        <h3>Substitutes:</h3>
                                        {
                                            match.lineup.home.substitutes.map(function(substitute, n){
                                                return (
                                                    <p key={n}>
                                                        {substitute.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                        <hr />
                                        <h3>Substitutions:</h3>
                                        {
                                            match.lineup.home.substitutions.map(function(substitution, o){
                                                return (
                                                    <p key={0}>
                                                        {substitution.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                        <hr />
                                        <h3>Coach:</h3>
                                        {
                                            match.lineup.home.coach.map(function(ch, p){
                                                return (
                                                    <p key={p}>
                                                        {ch.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                    </TabPanel>
                                    <TabPanel tabalign="center">
                                        <h3>Starting Lineups:</h3>
                                        {
                                            match.lineup.away.starting_lineups.map(function(lineup, a){
                                                return (
                                                    <p key={a}>
                                                        {lineup.lineup_number}.{lineup.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                        <hr />
                                        <h3>Substitutes:</h3>
                                        {
                                            match.lineup.away.substitutes.map(function(substitute, b){
                                                return (
                                                    <p key={b}>
                                                        {substitute.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                        <hr />
                                        <h3>Substitutions:</h3>
                                        {
                                            match.lineup.away.substitutions.map(function(substitution, c){
                                                return (
                                                    <p key={c}>
                                                        {substitution.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                        <hr />
                                        <h3>Coach:</h3>
                                        {
                                            match.lineup.away.coach.map(function(ch, d){
                                                return (
                                                    <p key={d}>
                                                        {ch.lineup_player}
                                                    </p>
                                                )
                                            })
                                        }
                                    </TabPanel>
                                </Tabs>

                            </div>
                        </div>
                    )
                })
            }
        </div>        
      );
    }
}

export default FootBallMatchInfo;