import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Card extends Component {
  render() {
    return (
      <div style={{ margin: '1em' }}>
        <img width="75" src={this.props.avatar_url} />
        <div style={{ display: 'inline-block', marginRight: 10, marginLeft: 10, verticalAlign: 'top' }}>
          <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{this.props.name}</div>
          <div>{this.props.company}</div>
        </div>
      </div>
    );
  };
};

class CardList extends Component {
  render() {
    return (
      <div>
        {this.props.cards.map(card => <Card key={card.id} {...card}/>)}
      </div>
    )
  }
}

class Form extends Component{

  state = {userName: ''};

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(
      resp => {
        this.props.onSubmit(resp.data);
      });
  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        value={this.state.userName}
        onChange={(event) => this.setState({userName: event.target.value})}
        placeholder="Github username" required />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends Component {

  state = {
    cards: [
      {name:"Paul O’Shannessy",
      avatar_url:"https://avatars1.githubusercontent.com/u/8445?v=4",
      company:"Facebook"}
    ]
  };

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
