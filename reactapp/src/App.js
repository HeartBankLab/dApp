import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import web3 from "./web3";
import token from "./token";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { balance: "" };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const balance = await token.methods.balanceOf(accounts[0]).call();

    this.setState({ balance });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Token Contract</h1>
        </header>
        <p className="App-intro">Your balance is {this.state.balance}</p>
      </div>
    );
  }
}

export default App;
