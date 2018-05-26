import React, { Component } from 'react';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class FootballLeague extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            leagues: [],
            standings: [],
            fixtures: [],
            teams: [],
            selectedLeagueId: '',
            selectedLeagueName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTeamUrl = this.handleTeamUrl.bind(this);
    }

    handleTeamUrl(url){
        var arrUrl=url.split('/');

        this.props.history.push('/football-updates/team/'+arrUrl[5]);
    }
    
    handleChange(event) {
        this.setState({
            selectedLeagueId: event.target.value,
            selectedLeagueName: event.target.options[event.target.selectedIndex].text
        });

        if(event.target.value !== '0'){
            this.fetchFixturesByLeague(event.target.value);
        }
        else{
            this.fetchFixtures();
        }

        this.fetchTeamsByLeague(event.target.value);
        this.fetchStandingsByLeague(event.target.value);
    }
    
    fetchTeamsByLeague(leagueId)
    {
        var urlPath = Global.FootballUrl2 + "competitions/"+leagueId+"/teams";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data.teams !== undefined){
                const teams = res.data.teams;
                //console.log(teams);
                //console.log(teams[0]._links.self.href);
                this.setState({ teams });
              }
              else{
                this.setState({ teams: [] });
              }
          })
          .catch(error => {
            this.setState({ teams: [] });
          })
    }

    fetchFixturesByLeague(leagueId)
    {
        var urlPath = Global.FootballUrl2 + "competitions/"+leagueId+"/fixtures";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data.fixtures !== undefined){
                const fixtures = res.data.fixtures;
                //console.log(fixtures);
                this.setState({ fixtures });
              }
              else{
                this.setState({ fixtures: [] });
              }
          })
          .catch(error => {
            this.setState({ fixtures: [] });
          })
    }

    fetchStandingsByLeague(leagueId)
    {
        var urlPath = Global.FootballUrl2 + "competitions/"+leagueId+"/leagueTable";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data.standing !== undefined){
                const standings = res.data.standing;
                //console.log(standings);
                this.setState({ standings });
              }
              else{
                this.setState({ standings: [] });
              }
          })
          .catch(error => {
            this.setState({ standings: [] });
          })
    }

    fetchFixtures()
    {
        var urlPath = Global.FootballUrl2 + "fixtures/";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data.fixtures !== undefined){
                const fixtures = res.data.fixtures;
                //console.log(fixtures);
                this.setState({ fixtures });
              }
              else{
                this.setState({ fixtures: [] });
              }
          })
          .catch(error => {
            this.setState({ fixtures: [] });
          })
    }

    fetchLeagues()
    {
        var urlPath = Global.FootballUrl2 + "competitions/";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const leagues = res.data;
                //console.log(leagues);
                this.setState({ leagues });
              }
              else{
                this.setState({ leagues: [] });
              }
          })
          .catch(error => {
            this.setState({ leagues: [] });
          })
    }    

    componentDidMount() {
        this.fetchFixtures();
        this.fetchLeagues();
    }


    render() {

    const title ="Football Updates";

      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                {title}
            </h1>
    
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item active">{title}</li>
            </ol>
            
            <div class="row">

                <div class="col-lg-4 mb-4">
                    <div class="card mb-4">
                        <h5 class="card-header">Choose League</h5>
                        <div class="card-body">
                        <form>
                        <div class="input-group">
                            <select class="form-control" onChange={this.handleChange}>
                            <option value="0"></option>
                            {  
                                this.state.leagues.map(function(league, i){
                                    return (  
                                        <option value={league.id} key={i}>{league.caption}</option>
                                    )
                                })
                            }   
                            </select> 
                        </div>
                        </form>
                        </div>
                    </div>
                    <div class="card my-4">
                        <h5 class="card-header">Teams - {this.state.selectedLeagueName}</h5>
                        <div class="card-body sidebar-scroll">
                            <div class="row">
                                <div class="col-lg-10">
                                <ul class="list-unstyled mb-0">
                                {
                                    this.state.teams.map(function(team, i){
                                        return (  
                                            <li key={i}>
                                                <a href="javascript:void(0)" onClick={() => {this.handleTeamUrl(team._links.self.href)}}>
                                                    <img src={team.crestUrl} style={{width: 25, height: 25}} alt=""/>
                                                    {team.name}
                                                </a>
                                            </li>
                                        )
                                    }, this)
                                }  
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </div>

                <div class="col-lg-8 mb-4">
                <h5 class="card-header">Fixtures - {this.state.selectedLeagueName}</h5>
                    <p>&nbsp;</p>
                    <div class="card-body text-center scroll">
                        <table class="table table-hover table-responsive">
                            <tbody>
                            {
                                this.state.fixtures
                                .sort((a,b) => new Date(a.date) - new Date(b.date))
                                .map(function(fixture, i){
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {moment.utc(fixture.date).local().format("Do MMM YYYY")}
                                                &nbsp;
                                                {moment.utc(fixture.date).local().format("h:mm:ss a")}
                                            </td>
                                            <td>
                                                {fixture.result.goalsHomeTeam}
                                                &nbsp;-&nbsp;
                                                {fixture.result.goalsAwayTeam}
                                            </td>
                                            <td>
                                                {fixture.homeTeamName}
                                                &nbsp;vs&nbsp;
                                                {fixture.awayTeamName}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    

                    <h5 class="card-header">Standings - {this.state.selectedLeagueName}</h5>
                    <div class="card-body scroll">
                        <table class="table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>P</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>PTS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.standings
                                .sort((a,b) => parseInt(a.position) - parseInt(b.position))
                                .map(function(standing, i){
                                    return (
                                        <tr key={i}>
                                            <td>{standing.position}</td>
                                            <td>
                                                <img src={standing.crestURI} style={{width: 25, height: 25}} alt=""/>
                                                {standing.teamName}
                                            </td>
                                            <td>{standing.playedGames}</td>
                                            <td>{standing.wins}</td>
                                            <td>{standing.draws}</td>
                                            <td>{standing.losses}</td>
                                            <td>{standing.goals}</td>
                                            <td>{standing.goalsAgainst}</td>
                                            <td>{standing.goalDifference}</td>
                                            <td>{standing.points}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                            
                    
                    

                </div>
                
            </div>
    
        </div>        
      );
    }
}

export default FootballLeague;