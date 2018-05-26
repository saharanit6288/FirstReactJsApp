import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import Global from '../Shared/Global';
import axios from 'axios';

class CricketPlayerInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            info: {},
            playerId: props.match.params.playerId,
            data: {
                batting: {
                    ODIs: {},
                    listA: {},
                    T20Is: {},
                    firstClass: {},
                    tests: {}
                },
                bowling: {
                    ODIs: {},
                    listA: {},
                    T20Is: {},
                    firstClass: {},
                    tests: {}
                }
            }
        };
    }

    fetchPlayerInfo(playerId)
    {
        var urlPath = Global.CricketApiUrl + "playerStats?pid="+playerId+"&apikey="+Global.CricketApiKey;

        axios.get(urlPath)
          .then(res => {
              
            if(res.data !== undefined){
                const info = res.data;
                console.log(info);
                this.setState({ info, data: info.data });
                
              }
              else{
                this.setState({ info: {} });
              }
          })
          .catch(error => {
            this.setState({ info: {} });
          })
    }

    componentDidMount() {
        this.fetchPlayerInfo(this.state.playerId);
    }

    render() {
      return (   
            <div class="container">

                <h1 class="mt-4 mb-3">
                    Player Info
                </h1>

                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                    <Link to="/cricket-updates">Cricket</Link>
                </li>
                <li class="breadcrumb-item active">Player Info</li>
                </ol>

                <div class="row">

                    <div class="col-lg-3">
                        <div class="card mb-4">
                            <h5 class="card-header">{this.state.info.name}</h5>
                            <div class="card-body">
                                <img src={this.state.info.imageURL}  style={{width: 200, height: 250 }} alt={this.state.info.name} />
                            </div>
                        </div>

                        <div class="card my-4">
                            <h5 class="card-header">Personal Information</h5>
                            <div class="card-body">
                                <p><b>Country:</b>&nbsp;{this.state.info.country}</p>
                                <p><b>Born:</b>&nbsp;{this.state.info.born}</p>
                                <p><b>Age:</b>&nbsp;{this.state.info.currentAge}</p>
                                <p><b>Role:</b>&nbsp;{this.state.info.playingRole}</p>
                                <p><b>Batting Style:</b>&nbsp;{this.state.info.battingStyle}</p>
                                <p><b>Bowling Style:</b>&nbsp;{this.state.info.bowlingStyle}</p>
                            </div>
                        </div>

                        <div class="card my-4">
                            <h5 class="card-header">Career Information</h5>
                            <div class="card-body">
                                <p><b>Teams:</b>&nbsp;{this.state.info.majorTeams}</p>
                                
                            </div>
                        </div>

                    </div>


                    <div class="col-lg-9">

                        <div class="card mb-4">
                            <div class="card-body">
                                <h2 class="card-title">Profile</h2>
                                <p class="card-text">
                                    <b>{this.state.info.fullName}</b>
                                    <br />
                                    {this.state.info.profile}
                                </p>

                                <b>Batting Summary</b>
                                <table class="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>M</th>
                                        <th>Inn</th>
                                        <th>NO</th>
                                        <th>Runs</th>
                                        <th>HS</th>
                                        <th>Avg</th>
                                        <th>BF</th>
                                        <th>CT</th>
                                        <th>SR</th>
                                        <th>ST</th>
                                        <th>100</th>
                                        <th>50</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data.batting.hasOwnProperty("ODIs") &&
                                            <tr>
                                                <td>ODIs</td>
                                                <td>{this.state.data.batting.ODIs.Mat}</td>
                                                <td>{this.state.data.batting.ODIs.Inns}</td>
                                                <td>{this.state.data.batting.ODIs.NO}</td>
                                                <td>{this.state.data.batting.ODIs.Runs}</td>
                                                <td>{this.state.data.batting.ODIs.HS}</td>
                                                <td>{this.state.data.batting.ODIs.Ave}</td>
                                                <td>{this.state.data.batting.ODIs.BF}</td>
                                                <td>{this.state.data.batting.ODIs.Ct}</td>
                                                <td>{this.state.data.batting.ODIs.SR}</td>
                                                <td>{this.state.data.batting.ODIs.St}</td>
                                                <td>{this.state.data.batting.ODIs['100']}</td>
                                                <td>{this.state.data.batting.ODIs['50']}</td>
                                                <td>{this.state.data.batting.ODIs['4s']}</td>
                                                <td>{this.state.data.batting.ODIs['6s']}</td>
                                            </tr>
                                        }
                                        {
                                            this.state.data.batting.hasOwnProperty("tests") &&
                                            <tr>
                                                <td>Tests</td>
                                                <td>{this.state.data.batting.tests.Mat}</td>
                                                <td>{this.state.data.batting.tests.Inns}</td>
                                                <td>{this.state.data.batting.tests.NO}</td>
                                                <td>{this.state.data.batting.tests.Runs}</td>
                                                <td>{this.state.data.batting.tests.HS}</td>
                                                <td>{this.state.data.batting.tests.Ave}</td>
                                                <td>{this.state.data.batting.tests.BF}</td>
                                                <td>{this.state.data.batting.tests.Ct}</td>
                                                <td>{this.state.data.batting.tests.SR}</td>
                                                <td>{this.state.data.batting.tests.St}</td>
                                                <td>{this.state.data.batting.tests['100']}</td>
                                                <td>{this.state.data.batting.tests['50']}</td>
                                                <td>{this.state.data.batting.tests['4s']}</td>
                                                <td>{this.state.data.batting.tests['6s']}</td>
                                            </tr>
                                        }
                                        {
                                            this.state.data.batting.hasOwnProperty("T20Is") &&
                                            <tr>
                                                <td>T20Is</td>
                                                <td>{this.state.data.batting.T20Is.Mat}</td>
                                                <td>{this.state.data.batting.T20Is.Inns}</td>
                                                <td>{this.state.data.batting.T20Is.NO}</td>
                                                <td>{this.state.data.batting.T20Is.Runs}</td>
                                                <td>{this.state.data.batting.T20Is.HS}</td>
                                                <td>{this.state.data.batting.T20Is.Ave}</td>
                                                <td>{this.state.data.batting.T20Is.BF}</td>
                                                <td>{this.state.data.batting.T20Is.Ct}</td>
                                                <td>{this.state.data.batting.T20Is.SR}</td>
                                                <td>{this.state.data.batting.T20Is.St}</td>
                                                <td>{this.state.data.batting.T20Is['100']}</td>
                                                <td>{this.state.data.batting.T20Is['50']}</td>
                                                <td>{this.state.data.batting.T20Is['4s']}</td>
                                                <td>{this.state.data.batting.T20Is['6s']}</td>
                                            </tr>
                                        }
                                        {
                                            this.state.data.batting.hasOwnProperty("firstClass") &&
                                            <tr>
                                                <td>1st Class</td>
                                                <td>{this.state.data.batting.firstClass.Mat}</td>
                                                <td>{this.state.data.batting.firstClass.Inns}</td>
                                                <td>{this.state.data.batting.firstClass.NO}</td>
                                                <td>{this.state.data.batting.firstClass.Runs}</td>
                                                <td>{this.state.data.batting.firstClass.HS}</td>
                                                <td>{this.state.data.batting.firstClass.Ave}</td>
                                                <td>{this.state.data.batting.firstClass.BF}</td>
                                                <td>{this.state.data.batting.firstClass.Ct}</td>
                                                <td>{this.state.data.batting.firstClass.SR}</td>
                                                <td>{this.state.data.batting.firstClass.St}</td>
                                                <td>{this.state.data.batting.firstClass['100']}</td>
                                                <td>{this.state.data.batting.firstClass['50']}</td>
                                                <td>{this.state.data.batting.firstClass['4s']}</td>
                                                <td>{this.state.data.batting.firstClass['6s']}</td>
                                            </tr>
                                        }
                                        {
                                            this.state.data.batting.hasOwnProperty("listA") &&
                                            <tr>
                                                <td>ListA</td>
                                                <td>{this.state.data.batting.listA.Mat}</td>
                                                <td>{this.state.data.batting.listA.Inns}</td>
                                                <td>{this.state.data.batting.listA.NO}</td>
                                                <td>{this.state.data.batting.listA.Runs}</td>
                                                <td>{this.state.data.batting.listA.HS}</td>
                                                <td>{this.state.data.batting.listA.Ave}</td>
                                                <td>{this.state.data.batting.listA.BF}</td>
                                                <td>{this.state.data.batting.listA.Ct}</td>
                                                <td>{this.state.data.batting.listA.SR}</td>
                                                <td>{this.state.data.batting.listA.St}</td>
                                                <td>{this.state.data.batting.listA['100']}</td>
                                                <td>{this.state.data.batting.listA['50']}</td>
                                                <td>{this.state.data.batting.listA['4s']}</td>
                                                <td>{this.state.data.batting.listA['6s']}</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                
                                <b>Bowling Summary</b>
                                <table class="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>M</th>
                                        <th>Inn</th>
                                        <th>B</th>
                                        <th>Runs</th>
                                        <th>Wkts</th>
                                        <th>BBI</th>
                                        <th>BBM</th>
                                        <th>Econ</th>
                                        <th>Avg</th>
                                        <th>SR</th>
                                        <th>4W</th>
                                        <th>5W</th>
                                        <th>10W</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.data.bowling.hasOwnProperty("ODIs") &&
                                        <tr>
                                            <td>ODIs</td>
                                            <td>{this.state.data.bowling.ODIs.Mat}</td>
                                            <td>{this.state.data.bowling.ODIs.Inns}</td>
                                            <td>{this.state.data.bowling.ODIs.Balls}</td>
                                            <td>{this.state.data.bowling.ODIs.Runs}</td>
                                            <td>{this.state.data.bowling.ODIs.Wkts}</td>
                                            <td>{this.state.data.bowling.ODIs.BBI}</td>
                                            <td>{this.state.data.bowling.ODIs.BBM}</td>
                                            <td>{this.state.data.bowling.ODIs.Econ}</td>
                                            <td>{this.state.data.bowling.ODIs.Ave}</td>
                                            <td>{this.state.data.bowling.ODIs.SR}</td>
                                            <td>{this.state.data.bowling.ODIs['4w']}</td>
                                            <td>{this.state.data.bowling.ODIs['5w']}</td>
                                            <td>{this.state.data.bowling.ODIs['10']}</td>
                                        </tr>
                                    }
                                    {
                                        this.state.data.bowling.hasOwnProperty("tests") &&
                                        <tr>
                                            <td>Tests</td>
                                            <td>{this.state.data.bowling.tests.Mat}</td>
                                            <td>{this.state.data.bowling.tests.Inns}</td>
                                            <td>{this.state.data.bowling.tests.Balls}</td>
                                            <td>{this.state.data.bowling.tests.Runs}</td>
                                            <td>{this.state.data.bowling.tests.Wkts}</td>
                                            <td>{this.state.data.bowling.tests.BBI}</td>
                                            <td>{this.state.data.bowling.tests.BBM}</td>
                                            <td>{this.state.data.bowling.tests.Econ}</td>
                                            <td>{this.state.data.bowling.tests.Ave}</td>
                                            <td>{this.state.data.bowling.tests.SR}</td>
                                            <td>{this.state.data.bowling.tests['4w']}</td>
                                            <td>{this.state.data.bowling.tests['5w']}</td>
                                            <td>{this.state.data.bowling.tests['10']}</td>
                                        </tr>
                                    }
                                    {
                                        this.state.data.bowling.hasOwnProperty("T20Is") &&
                                        <tr>
                                            <td>T20Is</td>
                                            <td>{this.state.data.bowling.T20Is.Mat}</td>
                                            <td>{this.state.data.bowling.T20Is.Inns}</td>
                                            <td>{this.state.data.bowling.T20Is.Balls}</td>
                                            <td>{this.state.data.bowling.T20Is.Runs}</td>
                                            <td>{this.state.data.bowling.T20Is.Wkts}</td>
                                            <td>{this.state.data.bowling.T20Is.BBI}</td>
                                            <td>{this.state.data.bowling.T20Is.BBM}</td>
                                            <td>{this.state.data.bowling.T20Is.Econ}</td>
                                            <td>{this.state.data.bowling.T20Is.Ave}</td>
                                            <td>{this.state.data.bowling.T20Is.SR}</td>
                                            <td>{this.state.data.bowling.T20Is['4w']}</td>
                                            <td>{this.state.data.bowling.T20Is['5w']}</td>
                                            <td>{this.state.data.bowling.T20Is['10']}</td>
                                        </tr>
                                    }
                                    {
                                        this.state.data.bowling.hasOwnProperty("firstClass") &&
                                        <tr>
                                            <td>1st Class</td>
                                            <td>{this.state.data.bowling.firstClass.Mat}</td>
                                            <td>{this.state.data.bowling.firstClass.Inns}</td>
                                            <td>{this.state.data.bowling.firstClass.Balls}</td>
                                            <td>{this.state.data.bowling.firstClass.Runs}</td>
                                            <td>{this.state.data.bowling.firstClass.Wkts}</td>
                                            <td>{this.state.data.bowling.firstClass.BBI}</td>
                                            <td>{this.state.data.bowling.firstClass.BBM}</td>
                                            <td>{this.state.data.bowling.firstClass.Econ}</td>
                                            <td>{this.state.data.bowling.firstClass.Ave}</td>
                                            <td>{this.state.data.bowling.firstClass.SR}</td>
                                            <td>{this.state.data.bowling.firstClass['4w']}</td>
                                            <td>{this.state.data.bowling.firstClass['5w']}</td>
                                            <td>{this.state.data.bowling.firstClass['10']}</td>
                                        </tr>
                                    }
                                    {
                                        this.state.data.bowling.hasOwnProperty("listA") &&
                                        <tr>
                                            <td>ListA</td>
                                            <td>{this.state.data.bowling.listA.Mat}</td>
                                            <td>{this.state.data.bowling.listA.Inns}</td>
                                            <td>{this.state.data.bowling.listA.Balls}</td>
                                            <td>{this.state.data.bowling.listA.Runs}</td>
                                            <td>{this.state.data.bowling.listA.Wkts}</td>
                                            <td>{this.state.data.bowling.listA.BBI}</td>
                                            <td>{this.state.data.bowling.listA.BBM}</td>
                                            <td>{this.state.data.bowling.listA.Econ}</td>
                                            <td>{this.state.data.bowling.listA.Ave}</td>
                                            <td>{this.state.data.bowling.listA.SR}</td>
                                            <td>{this.state.data.bowling.listA['4w']}</td>
                                            <td>{this.state.data.bowling.listA['5w']}</td>
                                            <td>{this.state.data.bowling.listA['10']}</td>
                                        </tr>
                                    }   
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>

                    </div>

                    
                </div>



            </div>
        );
    }
}

export default CricketPlayerInfo;