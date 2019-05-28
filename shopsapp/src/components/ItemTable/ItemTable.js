import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class ItemTable extends React.Component {
  state = {
    items: [
      { name: 'Coca Cola', price: '2.99$' },
      { name: 'Chio Chips', price: '6.99$' },
      { name: 'French Fries', price: '8.99$' },
    ],
    filtered: [],
  }

  componentDidMount() {
    this.setState({ filtered: this.state.items });
  }


  filter = (e) => {
    let { value } = e.target;
    this.setState({ filtered: this.state.items.filter(item => item.name.includes(value)) });
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
              <input type="text" className="filter-products" placeholder="Product name..." onChange={this.filter} />
            </div>
          </Toolbar>
        </AppBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.filtered.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" aria-label="Add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ItemTable;