import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Whack a Mole</h1>
        <Game />
      </div>
    )
  }
}

class Hole extends React.Component {
  render() {
    return (
      <button
      className="hole"
      onClick={() => this.props.onClick({value: 'X'})}
      >{this.props.value}</button>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holes: Array(16).fill("O"),
      points: 0
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      holes: Array(16).fill("O")
    });
    const mole = Math.round(Math.random() * 16) - 1;
    console.log(mole)
    const holes = this.state.holes.slice();
    holes[mole] = 'M';
    this.setState({holes: holes});
  }

  handleClick(i) {
    const holes = this.state.holes.slice();
    if (holes[i] === 'M') {
      const points = this.state.points + 1;
      this.setState({points: points});
      console.log('point')
    };
    holes[i] = 'X';
    this.setState({holes: holes});
  }

  renderHole(i) {
    return (
      <Hole
      value={this.state.holes[i]}
      onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderHole(0)}
          {this.renderHole(1)}
          {this.renderHole(2)}
          {this.renderHole(3)}
        </div>
        <div className="board-row">
          {this.renderHole(4)}
          {this.renderHole(5)}
          {this.renderHole(6)}
          {this.renderHole(7)}
        </div>
        <div className="board-row">
          {this.renderHole(8)}
          {this.renderHole(9)}
          {this.renderHole(10)}
          {this.renderHole(11)}
        </div>
        <div className="board-row">
          {this.renderHole(12)}
          {this.renderHole(13)}
          {this.renderHole(14)}
          {this.renderHole(15)}
        </div>
        <p>Score: {this.state.points}</p>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
