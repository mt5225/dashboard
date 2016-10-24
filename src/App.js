import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dashboard from './components/Dashboard'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Dashboard />
      </MuiThemeProvider>
    );
  }
}

export default App;
