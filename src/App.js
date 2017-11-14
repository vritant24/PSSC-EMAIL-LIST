import React, { Component } from 'react';
import {Route}              from 'react-router-dom';

import EventSelect          from './pages/event-select';
import EventAdd             from './pages/event-add';
import CheckIn              from './pages/check-in';

class App extends Component {
    render() {
      return (
        <div>
          <Route path="/"             component={CheckIn}/>
        </div>
      )
    }
}

export default App;
