import React from 'react'
import './ExpandingCell.css';

export default class ExpandingCell extends React.Component {
  state = {
    active: false,
  }

  expand = () => {
    this.setState({
      active: !this.state.active,
    })
  }

  render() {
    return (
      <div className="expanding-cell"
        style={{
          backgroundImage: `url(./images/${this.props.background}`,
          height: `${250 * this.props.height}px`,
        }}
        onClick={this.expand}
      >
        <div className="title" style={{ lineHeight: `${250 * this.props.height}px`, }}>
          {this.props.text}
        </div>
        <div className="cell-content" style={{ display: this.state.active ? 'block' : 'none' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    );
  }
}