import React from 'react'
import QRReader from '../QRReader/QRReader';
import { Table, TableBody, TableRow, TableCell, AppBar, Toolbar, Typography, IconButton, Button, TableHead } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Coca cola</TableCell>
                <TableCell>2.99$</TableCell>
                <TableCell>
                  <div class="flex-row-center">
                    <input type="text" className="quantity" value={1} />
                    <div className="quantity-buttons">
                      <IconButton aria-label="Delete" size="small">
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="Delete" size="small">
                        <RemoveIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" aria-label="Remove from shopping cart">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="cart-sum">
            <div>Total: <b>2.99$</b></div>
          </div>
          <div className="flex-row-center cart-buttons">
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
      </div>
    )
  }

}

export default ShoppingCart;