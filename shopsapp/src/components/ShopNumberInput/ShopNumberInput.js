import React from 'react'
import { Typography } from '@material-ui/core';

class ShopNumberInput extends React.Component {
  render() {
    return (
      <div className="shop-box">
        <input type="text" name="shop-number" className="shop-number" placeholder="Shop number..." onKeyDown={this.props.onInput} />
        <Typography variant="h5">
          Shop: {this.props.shopName} ({this.props.shopId})
        </Typography>
      </div>
    );
  }
}

export default ShopNumberInput;