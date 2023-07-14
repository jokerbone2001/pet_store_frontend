import logo from './logo.svg';
import './App.css';
import React from'react';

const URL = "http://localhost:8080/nft_json";
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: "OFF",
      NFTs: []
    }
  }

  handleClick(){
    this.setState({
      status: this.state.status === "OFF" ? "ON" : "OFF"
    })
  }
  fetchURL(){
    fetch(URL)
    .then(response => {return response.json()})
    .then(data => {
        this.setState({NFTs: data});
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
  }

  handleRefresh(){
    this.fetchURL();
  }
 
  componentDidMount(){
    this.fetchURL();
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
          <button
            className="App-link"
            onClick = {this.handleRefresh.bind(this)}
          >
            REFRESH
          </button>
          {this.state.NFTs.map((nft, index) => (
            <img key={index} src={nft.imageURL} alt="nft" style={{width: '200px', height: '200px'}}/>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
