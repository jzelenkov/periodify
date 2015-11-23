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

  onChange = (evt) => {
    let word = evt.target.value;
    let result = periodify(word);
    this.setState({result});
  }.bind(this);

  render() {
    let result = this.state.result.join(', ');

    return (
      <div className="periodify">
        <input type="text" className="periodify-input" placeholder="Type a word to periodify..." onChange={this.onChange} />
        <p className="periodify-result">{result}</p>
      </div>
    );
  }

}

export default PeriodifyDemo;
