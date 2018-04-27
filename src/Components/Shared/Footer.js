import React, { Component } from 'react';


class Footer extends Component {
    render() {
      return (
            <footer class="py-5 bg-dark">
                <div class="container">
                <p class="m-0 text-center text-white">
                    Copyright &copy; Sports Updater
                    &nbsp; {(new Date().getFullYear())} - {(new Date().getFullYear()+1)}
                </p>
                </div>
            </footer>


        );
    }
}

export default Footer;