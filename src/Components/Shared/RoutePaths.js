import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About';
import Services from '../Services';
import Contact from '../Contact';
import SportsNews from '../SportsNews';
import FootballUpdates from '../FootballUpdates';
import CricketUpdates from '../CricketUpdates';
import FootballMatchInfo from '../Football/FootballMatchInfo';

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
                    <Route path="/cricket" component={CricketUpdates}/>
                </Switch>
            </div>
        );
    }
}

export default RoutePaths;