import React, { Component } from 'react';
//import logo from './logo.svg';
import ScatterPlot from './ScatterPlot';
import './App.css';
import ReactDOM from 'react-dom';
class App extends Component {
 




  constructor(props)
  {
      super(props);
      this.myclick=this.myclick.bind(this);
  }

  myclick(){
    ReactDOM.render(<ScatterPlot />, document.getElementById('root'));

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <button onClick={this.myclick}>Display ScatterPlot</button>
         
        </header>
      </div>
    );
  }
}

export default App;
