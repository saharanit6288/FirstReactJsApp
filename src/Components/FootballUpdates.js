import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from './Shared/Global';
import axios from 'axios';
import moment from 'moment';

function LiveMatch() {
    return <span class="btn btn-danger btn-sm">LIVE</span>;
}

class FootballUpdates extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            countries: [],
            leagues: [],
            standings: [],
            fixtures: [],
            selectedCountryId: Global.FootballDefaultCountryId,
            selectedLeagueId: Global.FootballDefaultLeagueId,
            selectedLeagueName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLeagueSubmit = this.handleLeagueSubmit.bind(this);
    }

    

    handleLeagueSubmit(leagueId){
        this.fetchFixtures(leagueId);
        this.fetchTeamStandings(leagueId);
    }

    handleChange(event) {
        this.setState({selectedCountryId: event.target.value});
    }
    
    handleSubmit(event) {
        this.fetchLeagues(this.state.selectedCountryId);
        event.preventDefault();
    }

    

    fetchCountries() {
        var urlPath = Global.FootballUrl + "?action=get_countries&APIkey=" + Global.FootballApiKey;
    
        axios.get(urlPath)
          .then(res => {
            if(!res.data.error){
                const countries = res.data;
            
                this.setState({ countries });
              }
              else{
                this.setState({ countries: [] });
              }
          })
          .catch(error => {
            this.setState({ countries: [] });
          })
    }

    fetchLeagues(country_id) {
        var urlPath = Global.FootballUrl + "?action=get_leagues&country_id="+country_id+"&APIkey=" + Global.FootballApiKey;
    
        axios.get(urlPath)
          .then(res => {
              if(!res.data.error){
                const leagues = res.data;
                
                this.setState({ leagues, selectedLeagueId: leagues[0].league_id, selectedLeagueName: leagues[0].league_name });
                console.log('fl-'+this.state.selectedLeagueId);
                this.fetchFixtures(this.state.selectedLeagueId);
                this.fetchTeamStandings(this.state.selectedLeagueId);
              }
              else{
                this.setState({ leagues: [] });
              }
          })
          .catch(error => {
            this.setState({ leagues: [] });
          })
          
    }

    fetchTeamStandings(leagueId){
        var urlPath = Global.FootballUrl + "?action=get_standings&league_id="+leagueId+"&APIkey=" + Global.FootballApiKey;

        axios.get(urlPath)
          .then(res => {
              if(!res.data.error){
                const standings = res.data;
                
                this.setState({ standings, selectedLeagueName: standings[0].league_name });
              }
              else{
                this.setState({ standings: [] });
              }
          })
          .catch(error => {
            this.setState({ standings: [] });
          })
    }
   
    fetchFixtures(leagueId){
        var fromDate = moment().add(-5, 'days').format("YYYY-MM-DD"); 
        var toDate = moment().add(25, 'days').format("YYYY-MM-DD"); 
        var urlPath = Global.FootballUrl + "?action=get_events&from="+fromDate+"&to="+toDate+"&league_id="+leagueId+"&APIkey=" + Global.FootballApiKey;
        
        axios.get(urlPath)
          .then(res => {
              if(!res.data.error){
                const fixtures = res.data;
                
                this.setState({ fixtures, selectedLeagueName: fixtures[0].league_name });
              }
              else{
                this.setState({ fixtures: [] });
              }
          })
          .catch(error => {
            this.setState({ fixtures: [] });
          })
    }


    componentDidMount() {
        
        this.fetchLeagues(this.state.selectedCountryId);
        this.fetchCountries();
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
                        <h5 class="card-header">Search</h5>
                        <div class="card-body">
                        <form onSubmit={this.handleSubmit}>
                        <div class="input-group">
                            <select class="form-control" value={this.state.selectedCountryId} onChange={this.handleChange}>
                            {  
                                this.state.countries.map(function(country, i){
                                    return (  
                                        <option value={country.country_id} key={i}>{country.country_name}</option>
                                    )
                                })
                            }   
                            </select> 
                            <span class="input-group-btn">
                                <button class="btn btn-secondary" type="submit">Go</button>
                            </span>  
                        </div>
                        </form>
                        </div>
                    </div>
                    <div class="card my-4">
                        <h5 class="card-header">Leagues</h5>
                        <div class="card-body sidebar-scroll">
                            <div class="row">
                                <div class="col-lg-10">
                                <ul class="list-unstyled mb-0">
                                {
                                    this.state.leagues.map(function(league, i){
                                        return (  
                                            <li key={i} onClick={this.handleLeagueSubmit.bind(this, league.league_id)}>
                                                <a href="javascript:void(0)">
                                                    {league.league_name}
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
                                <th>PTS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.standings
                                .sort((a,b) => parseInt(a.overall_league_position) - parseInt(b.overall_league_position))
                                .map(function(standing, i){
                                    return (
                                        <tr key={i}>
                                            <td>{standing.overall_league_position}</td>
                                            <td>{standing.team_name}</td>
                                            <td>{standing.overall_league_payed}</td>
                                            <td>{standing.overall_league_W}</td>
                                            <td>{standing.overall_league_D}</td>
                                            <td>{standing.overall_league_L}</td>
                                            <td>{standing.overall_league_GF}</td>
                                            <td>{standing.overall_league_GA}</td>
                                            <td>{standing.overall_league_PTS}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                            
                    <h5 class="card-header">Fixtures - {this.state.selectedLeagueName}</h5>
                    <p>&nbsp;</p>
                    <div class="card-body text-center scroll">
                        <table class="table table-hover table-responsive">
                            <tbody>
                            {
                                this.state.fixtures
                                .sort((a,b) => new Date(a.match_date) - new Date(b.match_date))
                                .map(function(fixture, i){
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {moment(fixture.match_date).format("Do MMM YYYY")}
                                                &nbsp;
                                                {fixture.match_time}
                                            </td>
                                            <td>
                                                
                                                {/* <span class="btn btn-danger btn-sm">LIVE</span> */}
                                                {fixture.match_live === "1" && <LiveMatch />}
                                            </td>
                                            <td>
                                                {fixture.match_hometeam_score}
                                                &nbsp;-&nbsp;
                                                {fixture.match_awayteam_score}
                                            </td>
                                            <td>
                                                {fixture.match_hometeam_name}
                                                &nbsp;vs&nbsp;
                                                {fixture.match_awayteam_name}
                                            </td>
                                            <td>
                                                <Link to={`/football/match/${fixture.match_id}`}>Summary</Link>
                                            </td>
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

export default FootballUpdates;