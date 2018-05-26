import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class About extends Component {
    render() {
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                About Me
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">About</li>
            </ol>
    
            <p>
                I'm Ranit Saha, B Tech in IT, 2010 passout from Mallabhum Institute of Tchnology. 
            </p>
            <p>
                Working as ASP.NET MVC Developer, more than 4.7+ yrs of experience in ASP.NET, C#, MSSQL.
                <br />
                Also have 3+ yrs of experience in MVC, WebApi, LINQ, EF.
                <br />
                Working knowledge in HTML,CSS, Jquery.
                <br />
                Basic knowledge in Angular 4 and also learn ReactJs. 
            </p>
            <p>
                Here is my <a href="https://www.linkedin.com/in/ranit-saha-6b76b422/" target="_blank">LinkedIn profile</a> 
            </p>
        </div>        
      );
    }
}

export default About;