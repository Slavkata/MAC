import React from 'react'
import { Table, TableBody, TableRow, TableCell, AppBar, Toolbar, Typography, IconButton, TableHead, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


import QuantityInput from './QuantityInput';
import CartFooter from './CartFooter';

class ShoppingCart extends React.Component {
  render() {
    let { inCart } = this.props;
    return (
      <div className="container-cart">
        <AppBar position="static" color="secondary">
          <Toolbar >
            <Typography variant="h6" color="inherit">
              Shopping Cart
            </Typography>
            {this.props.isLoan && <Button variant="contained" color="default" style={{ marginLeft: '20px' }} onClick={this.props.onReturnItems}>
              Return Items
              </Button>
            }

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
                    <TableCell>{item.price}€</TableCell>
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
          onClear={this.props.onClear}
          onSubmit={this.props.onSubmit}
          disableConfirm={this.props.inCart.length === 0}
        />
      </div>
    )
  }

}

export default ShoppingCart;