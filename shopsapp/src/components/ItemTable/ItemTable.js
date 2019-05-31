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
    return <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <WarningIcon color="secondary" style={{ width: '20px', height: '20px' }} />
      {amountLeft}
    </span>
  }

  getItemsAsRows = () => {
    return this.props.filtered.map(item => (
      <TableRow key={item.name}>
        <TableCell component="th" scope="row" style={{ width: '55%' }}>
          <b style={{ fontSize: '1.3em', fontWeight: 500 }}>{item.name}</b>
        </TableCell>
        <TableCell align="right" style={{ width: '10%' }}>
          {item.quantity < 20 && this.showStockWarning(item.quantity)}
          {item.quantity >= 20 && item.quantity}
        </TableCell>
        <TableCell align="right" style={{ width: '15%' }}>{item.category}</TableCell>
        <TableCell align="right" style={{ width: '10%' }}><span style={{ fontSize: '1.1em', fontWeight: 600 }}>{item.price}</span>€</TableCell>
        <TableCell align="right" style={{ width: '10%' }}>
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
              <TableCell component="th" scope="row" style={{ width: '55%' }}>Product Name</TableCell>
              <TableCell align="right" style={{ width: '10%' }}>In Stock</TableCell>
              <TableCell align="right" style={{ width: '15%' }}>
                <Button
                  variant="contained"
                  size="small"
                  color={this.props.sortedByCategory ? "primary" : "default"}
                  onClick={this.props.onCategorySort}>
                  Category
                  </Button>
              </TableCell>
              <TableCell align="right" style={{ width: '10%' }}>Price</TableCell>
              <TableCell align="right" style={{ width: '10%' }}>Action</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <div className="table-body">
          <Table style={{ tableLayout: 'fixed' }}>
            <TableBody>
              {this.getItemsAsRows()}
            </TableBody>
          </Table>
        </div>
      </div >
    )
  }
}

export default ItemTable;