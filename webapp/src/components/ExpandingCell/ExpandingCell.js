import React from 'react'
import './ExpandingCell.css';

export default class ExpandingCell extends React.Component {
  render() {
    return (
      <div className="expanding-cell"
        style={{
          backgroundImage: `url(./images/${this.props.background}`,
          height: `${250 * this.props.height}px`,
          lineHeight: `${250 * this.props.height}px`,
        }}
        onClick={this.props.clicked}
      >
        <div className="title">
          {this.props.text}
        </div>
      </div>
    );
  }
}