import React from 'react'
import QRReader from '../QRReader/QRReader';
import { Table, TableBody, TableRow, TableCell, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/CheckCircle';

class ShoppingCart extends React.Component {
  state = {
    cart: [
      { name: 'Coca Cola', price: 2.99 }
    ]
  }

  render() {
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
            <TableBody>
              <TableRow>
                <TableCell>Coca cola</TableCell>
                <TableCell>2.99$</TableCell>
                <TableCell>
                  <IconButton color="secondary" aria-label="Remove from shopping cart">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div class="flex-row-center">
        <Button variant="contained" color="secondary">
          <DeleteIcon />
          Clear Cart
        </Button>
        <Button variant="contained" color="primary">
          <CheckIcon />
          Proceed to payment
        </Button>
        </div>
      </div>
    )
  }

}

export default ShoppingCart;