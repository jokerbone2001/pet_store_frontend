import logo from './logo.svg';
import './App.css';
import React from'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: "OFF"
    }
  }

  handleClick(){
    this.setState({
      status: this.state.status === "OFF" ? "ON" : "OFF"
    })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.status}
          </p>
          <button
            className="App-link"
            onClick = {this.handleClick.bind(this)}
          >
            CHANGE
          </button>
        </header>
      </div>
    );
  }
}

export default App;
