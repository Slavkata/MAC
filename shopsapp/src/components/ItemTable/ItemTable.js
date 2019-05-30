import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { Button } from '@material-ui/core';

class ItemTable extends React.Component {

  addToCart = (item) => {
    ShoppingCart.addToCart(item);
  }

  showStockWarning = (amountLeft) => {
    return <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
      <WarningIcon color="secondary" />
      {amountLeft}
    </span>
  }

  getItemsAsRows = () => {
    return this.props.filtered.map(item => (
      <TableRow key={item.name}>
        <TableCell component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell align="right">
          {item.left < 20 && this.showStockWarning(item.left)}
          {item.left >= 20 && item.left}
        </TableCell>
        <TableCell align="right">{item.category}</TableCell>
        <TableCell align="right">{item.price}€</TableCell>
        <TableCell align="right">
          <IconButton color="primary" aria-label="Add to shopping cart" onClick={() => this.props.onItemAdd(item.id)}>
            <AddShoppingCartIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    return (
      <div className="table">
        <AppBar position="static" color="default">
          <Toolbar className="title-bar">
            <Typography variant="h6" color="inherit">
              Products
            </Typography>
            <div className="filter-box">
              <SearchIcon />
              <input type="text" className="filter-products" placeholder="Product name..." onChange={this.props.onFilterChange} />
            </div>
          </Toolbar>
        </AppBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">In Stock</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  size="small"
                  color={this.props.sortedByCategory ? "primary" : "default"}
                  onClick={this.props.onCategorySort}>
                  Category
                  </Button>
              </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.getItemsAsRows()}
          </TableBody>
        </Table>
      </div >
    )
  }
}

export default ItemTable;