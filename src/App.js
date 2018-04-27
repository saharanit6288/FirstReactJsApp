import React, { Component } from 'react';

import Header from './Components/Shared/Header';
import Content from './Components/Shared/Content';
import Footer from './Components/Shared/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
