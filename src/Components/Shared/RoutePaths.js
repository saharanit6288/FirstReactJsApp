import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About';
import Services from '../Services';
import Contact from '../Contact';
import SportsNews from '../SportsNews';
import FootballUpdates from '../FootballUpdates';
import FootballMatchInfo from '../Football/FootballMatchInfo';
import Events from '../Events/events';
import FootballLeague from '../FootballNew/FootballLeague';
import FootballTeam from '../FootballNew/FootballTeam';
import CricketMatchCalender from '../Cricket/CricketMatchCalender';
import CricketUpcomingMatches from '../Cricket/CricketUpcomingMatches';
import CricketMatchScore from '../Cricket/CricketMatchScore';
import CricketOldMatches from '../Cricket/CricketOldMatches';
import CricketPlayerInfo from '../Cricket/CricketPlayerInfo';

class RoutePaths extends Component {
    render() {
      return (            
            <div>
                <Switch>
                    <Route exact= {true} path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/services" component={Services}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/sports-news" component={SportsNews}/>
                    <Route path="/football" exact component={FootballUpdates}/>
                    <Route path="/football/league/:id" component={FootballUpdates}/>
                    <Route path="/football/match/:matchId" component={FootballMatchInfo}/>
                    <Route path="/cricket-updates" exact component={CricketUpcomingMatches}/>
                    <Route path="/cricket-updates/score/:matchId" component={CricketMatchScore}/>
                    <Route path="/cricket-updates/player/:playerId" component={CricketPlayerInfo}/>
                    <Route path="/cricket-match-calender" component={CricketMatchCalender}/>
                    <Route path="/cricket-old-matches" component={CricketOldMatches}/>
                    <Route path="/football-updates" exact component={FootballLeague}/>
                    <Route path="/football-updates/team/:teamId" component={FootballTeam}/>
                    <Route path="/events" component={Events}/>
                </Switch>
            </div>
        );
    }
}

export default RoutePaths;