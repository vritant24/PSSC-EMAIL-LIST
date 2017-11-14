import React                from 'react';
import ReactDOM             from 'react-dom';
import { BrowserRouter }    from 'react-router-dom'

import darkBaseTheme        from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';

import                           './index.css';
import App                  from './App';

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('root'));