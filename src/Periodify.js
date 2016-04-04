import React from 'react';
import './Periodify.less';
import periodify from 'periodify';

class PeriodifyDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  componentDidMount() {
    const word = 'broccoli';
    const result = periodify(word, true);
    this.setState({result});
  }

  onChange = (evt) => {
    const word = evt.target.value;
    const result = periodify(word, true);
    this.setState({result});
  }.bind(this);

  render() {
    const elems = this.state.result.map((elem) => {
      return <span className="chemical-element">
        {elem.symbol}
        <div className="desc" role="top-left">{elem.weight}</div>
        <div className="desc medium" role="bottom-left-2">{elem.number}</div>
      </span>;
    });

    return (
      <div className="periodify">
        <h1>Periodify.js</h1>
        <input type="text"
          className="periodify-input"
          placeholder="Type a word ..."
          defaultValue="broccoli"
          onChange={this.onChange} />

        <div className="chemical-chain">
          {elems}
        </div>
      </div>
    );
  }

}

export default PeriodifyDemo;
