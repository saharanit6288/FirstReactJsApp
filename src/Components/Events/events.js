import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

class Events extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            eventLocation: 'Kolkata',
            evnts: [],
            places: [],
            searchText: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);

    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleSubmit(event) {
        this.fetchEvents(this.state.searchText);
        event.preventDefault();
    }

    handleLocationClick(event_location) {
        this.fetchEvents(event_location);
    }

    componentDidMount() {
        
        this.fetchEvents(this.state.eventLocation);
        this.fetchPlaces();
    }

    fetchPlaces() {
        var urlPath = Global.EventBaseUrl + "places?q=india&type=country";
        var config = { headers: { Authorization: `Bearer ${Global.EventApiToken}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(!res.data.error){
                const places = res.data.results;
            
                this.setState({ places });
              }
              else{
                this.setState({ places: [] });
              }
          })
          .catch(error => {
            this.setState({ places: [] });
          })
    }

    fetchEvents(event_location) {
        var urlPath = Global.EventBaseUrl + "events/?q="+event_location;
        var config = { headers: { Authorization: `Bearer ${Global.EventApiToken}` } };

        axios.get(urlPath, config)
          .then(res => {
              if(!res.data.error){
                const evnts = res.data.results;
                
                this.setState({ evnts, eventLocation: event_location});
              }
              else{
                this.setState({ evnts: [] });
              }
          })
          .catch(error => {
            this.setState({ evnts: [] });
          })
          
    }


    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                Events : {this.state.eventLocation}
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">Events</li>
            </ol>
    
            <div class="row">
                <div class="col-lg-4">

                    <div class="card mb-4">
                    <h5 class="card-header">Search Location</h5>
                    <div class="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..." value={this.state.searchText} onChange={this.handleChange} />
                        <span class="input-group-btn">
                            <button class="btn btn-secondary" type="submit">Go!</button>
                        </span>
                        </div>
                    </form>
                    </div>
                    </div>

                    <div class="card my-4">
                    <h5 class="card-header">Places</h5>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <ul class="list-unstyled mb-0">
                                {
                                    this.state.places.map(function(place, i){
                                        return (  
                                            <li key={i} onClick={this.handleLocationClick.bind(this, place.name)}>
                                                <a href="javascript:void(0)">
                                                    {place.name} - {place.country}
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
                        
                {
                    this.state.evnts.map(function(evnt, i){
                        return ( 
                            <div class="col-lg-4 mb-4" key={i}>
                                <div class="card h-100">
                                <h4 class="card-header">{evnt.title}</h4>
                                <div class="card-body">
                                    <p class="card-text">
                                        {evnt.description}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    Timing: {moment(evnt.start).format("DD/MM/YYYY, h:mm:ss a")} 
                                    &nbsp;-&nbsp;
                                    {moment(evnt.end).format("DD/MM/YYYY, h:mm:ss a")}
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    
        </div>        
      );
    }
}

export default Events;