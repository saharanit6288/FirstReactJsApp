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
            searchText: '',
            latitude: '',
            longitude: '',
            prevLink: '',
            nextLink: '',
            buttonLink:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePreviousLink = this.handlePreviousLink.bind(this);
        this.handleNextLink = this.handleNextLink.bind(this);
    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleSubmit(event) {
        this.fetchPlace(this.state.searchText);
        event.preventDefault();
    }

    handleNextLink(url) {
        this.fetchEventsByUrl(url);
    }

    handlePreviousLink(url) {
        this.fetchEventsByUrl(url);
    }

    componentDidMount() {
        this.fetchPlace(this.state.eventLocation);
    }

    fetchPlace(placeName)
    {
        var urlPath = Global.EventBaseUrl + "places?q="+placeName+"&country=IN&limit=1";
        var config = { headers: { Authorization: `Bearer ${Global.EventApiToken}` } };

        axios.get(urlPath, config)
        .then(res => {
          if(!res.data.error){
              const places = res.data.results;
              this.setState({ 
                  eventLocation: placeName, 
                  longitude:places[0].location[0] , 
                  latitude: places[0].location[1]});

              this.fetchEvents(this.state.latitude, this.state.longitude);
            }
            else{
              this.setState({ longitude: '', latitude: '' });
            }
        })
        .catch(error => {
          this.setState({ longitude: '', latitude: '' });
        })

    }

    fetchEvents(lat,lon) {
        var radius = '10km';
        var fromDate = moment().format("YYYY-MM-DD"); 
        var toDate = moment().add(90, 'days').format("YYYY-MM-DD");

        var urlPath = Global.EventBaseUrl + "events/?within="+radius+"@"+lat+","+lon+"&start.gte="+fromDate+"&start.lte="+toDate+"&limit=9";
        var config = { headers: { Authorization: `Bearer ${Global.EventApiToken}` } };

        axios.get(urlPath, config)
          .then(res => {
              if(!res.data.error){
                const evnts = res.data.results;
                
                this.setState({ 
                    evnts,
                    prevLink: res.data.previous,
                    nextLink: res.data.next
                });
                
              }
              else{
                this.setState({ evnts: [] });
              }
          })
          .catch(error => {
            this.setState({ evnts: [] });
          })
          
    }

    fetchEventsByUrl(url)
    {
        var urlPath = url;
        var config = { headers: { Authorization: `Bearer ${Global.EventApiToken}` } };

        axios.get(urlPath, config)
          .then(res => {
              if(!res.data.error){
                const evnts = res.data.results;
                
                this.setState({ 
                    evnts,
                    prevLink: res.data.previous,
                    nextLink: res.data.next
                });
                
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

            <div class="col-lg-4">

                <div class="card mb-4">
                    <h5 class="card-header">Search Place</h5>
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

            </div>

            <div class="row">
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
            {
                this.state.prevLink !== null &&
                <button class="btn btn-primary" onClick={() => { this.handlePreviousLink(this.state.prevLink)}}>Previous</button>
            }
            &nbsp;
            {
                this.state.nextLink !== null &&
                <button class="btn btn-primary" onClick={() => { this.handleNextLink(this.state.nextLink)}}>Next</button>
            }
            <br /><br />
        </div>        
      );
    }
}

export default Events;