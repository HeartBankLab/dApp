import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import web3 from "./web3";
import token from "./token";

class App extends Component {
  state = { balance: "", address: "", amount: "", status: "" };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const balance = await token.methods.balanceOf(accounts[0]).call();

    this.setState({ balance });
  }

  transfer = async event => {
    event.preventDefault();
    this.setState({ status: "Transfer in progress..." });

    try {
      const accounts = await web3.eth.getAccounts();
      const tx = await token.methods
        .transfer(this.state.address, this.state.amount)
        .send({ from: accounts[0] });
      const balance = await token.methods.balanceOf(accounts[0]).call();
      this.setState({
        status: "TxHash: " + tx.transactionHash,
        balance
      });
    } catch (error) {
      this.setState({ status: error.message });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Token Contract</h1>
        </header>
        <h3 className="App-intro">Your balance is {this.state.balance}</h3>
        <form onSubmit={this.transfer}>
          <div>
            <label>Address:</label>
            <input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              value={this.state.amount}
              onChange={event => this.setState({ amount: event.target.value })}
            />
          </div>
          <button>Transfer</button>
        </form>
        <h5>{this.state.status}</h5>
      </div>
    );
  }
}

export default App;
