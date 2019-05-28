import React from 'react'
import QRReader from '../QRReader/QRReader';
import { Table, TableBody, TableRow, TableCell, AppBar, Toolbar, Typography, IconButton, TableHead } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


import QuantityInput from './QuantityInput';
import CartFooter from './CartFooter';

class ShoppingCart extends React.Component {


  handleAdd = (item) => {
    let { cart } = this.state;
    let itemInCart = cart.find(i => i.name === item.name);
    itemInCart.quantity++;
    this.setState({ cart })
  }

  handleRemove = (item) => {
    let { cart } = this.state;
    let itemInCart = cart.find(i => i.name === item.name);
    if (itemInCart.quantity <= 1) return;
    itemInCart.quantity--;
    this.setState({ cart })
  }

  render() {
    let { inCart } = this.props;
    return (
      <div className="container-cart">
        <AppBar position="static" color="secondary">
          <Toolbar >
            <Typography variant="h6" color="inherit"></Typography>
            Shopping Cart
            </Toolbar>
        </AppBar>
        <div className="cart-list">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                inCart.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}$</TableCell>
                    <TableCell>
                      <QuantityInput
                        quantity={item.quantity}
                        onAdd={this.props.onIncreaseQuantity}
                        onRemove={this.props.onDecreaseQuantity}
                        item={item}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary" aria-label="Remove from shopping cart" onClick={() => this.props.onRemove(item.id)}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
        <CartFooter
          total={this.props.total}
          onClear={this.clearCart}
          onSubmit={this.submit}
        />
      </div>
    )
  }

}

export default ShoppingCart;