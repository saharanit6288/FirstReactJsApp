import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class FootballTeam extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            fixtures: [],
            players: [],
            info: {},
            teamId: props.match.params.teamId
        };

    }

    fetchTeamInfo(teamId)
    {
        var urlPath = Global.FootballUrl2 + "teams/"+teamId;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const info = res.data;
                console.log(info);
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

    fetchTeamFixtures(teamId)
    {
        var urlPath = Global.FootballUrl2 + "teams/"+teamId+"/fixtures";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data.fixtures !== undefined){
                const fixtures = res.data.fixtures;
                console.log(fixtures);
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

    fetchTeamPlayers(matchId)
    {
        var urlPath = Global.FootballUrl2 + "teams/"+matchId+"/players";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data.players !== undefined){
                const players = res.data.players;
                console.log(players);
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
        this.fetchTeamInfo(this.state.teamId);
        this.fetchTeamFixtures(this.state.teamId);
        this.fetchTeamPlayers(this.state.teamId);
    }

    render() {
      return (            
            <div class="container">

                <h1 class="mt-4 mb-3">
                    Team Info
                </h1>

                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <Link to="/football-updates">Football</Link>
                </li>
                <li class="breadcrumb-item active">Team</li>
                </ol>

                {
                    <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2>
                            <img src={this.state.info.crestUrl} style={{width: 50, height: 50}} alt=""/>                 
                            {this.state.info.name}({this.state.info.shortName})
                        </h2>
                        <hr />
                        <h3>
                            Market Value: {this.state.info.squadMarketValue}
                        </h3>
                        <hr />
                        <Tabs>
                            <TabList>
                                <Tab>Fixtures</Tab>
                                <Tab>Players</Tab>                               
                            </TabList>
                            <TabPanel tabalign="center">
                                <table class="table table-hover table-responsive text-centered">
                                    <tbody>
                                    {
                                        this.state.fixtures
                                        .sort((a,b) => new Date(a.date) - new Date(b.date))
                                        .map(function(fixture, i){
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {moment.utc(fixture.date).format("Do MMM YYYY")}
                                                        &nbsp;
                                                        {moment.utc(fixture.date).format("h:mm:ss a")}
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
                            </TabPanel>
                            <TabPanel tabalign="center">
                                <table class="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>DOB</th>
                                        <th>Nationality</th>
                                        <th>Contract Until</th>
                                        <th>Market Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.players
                                        .map(function(player, m){
                                            return (
                                                <tr key={m}>
                                                    <td>{player.jerseyNumber}</td>
                                                    <td>{player.name}</td>
                                                    <td>{player.position}</td>
                                                    <td>{moment(player.dateOfBirth).format("Do MMM YYYY")}</td>
                                                    <td>{player.nationality}</td>
                                                    <td>{moment(player.contractUntil).format("Do MMM YYYY")}</td>
                                                    <td>{player.marketValue}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </TabPanel>
                        </Tabs>

                    </div>
                </div>
                }  
            </div>
        );
    }
}

export default FootballTeam;