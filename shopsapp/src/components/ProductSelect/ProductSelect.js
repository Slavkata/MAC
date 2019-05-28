import React from 'react'
import ItemTable from '../ItemTable/ItemTable';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

class ProductSelect extends React.Component {

  state = {
    available: [
      { id: 1, name: 'Coca Cola', price: 2.99 },
      { id: 2, name: 'Chio Chips', price: 6.99 },
      { id: 3, name: 'French Fries', price: 8.99 },
    ],
    filtered: [],
    inCart: [],
  }

  componentDidMount() {
    this.setState({ filtered: this.state.available });
  }

  filter = (e) => {
    const cleaned = (string) => {
      return string.toLowerCase().split(' ').join('');
    }

    let { value } = e.target;
    this.setState({ filtered: this.state.items.filter(item => cleaned(item.name).includes(cleaned(value))) });
  }

  onItemAdd = (itemId) => {
    let { available, inCart } = this.state;
    let item = available.find(item => item.id === itemId);
    inCart.push({ ...item, quantity: 1 });
    this.setState({ inCart });
  }

  increaseQuantity = (itemId) => {
    console.log(itemId);
    let { inCart } = this.state;
    let item = inCart.find(item => item.id === itemId);
    item.quantity++;
    this.setState({ inCart })
  }

  decreaseQuantity = (itemId) => {
    let { inCart } = this.state;
    let item = inCart.find(item => item.id === itemId);
    if (item.quantity <= 1) return;
    item.quantity--;
    this.setState({ inCart })
  }

  render() {
    return (
      <div className="container">
        <ItemTable
          filtered={this.state.filtered}
          onItemAdd={this.onItemAdd}
          onFilterChange={this.filter}
        />
        <ShoppingCart
          inCart={this.state.inCart}
          onIncreaseQuantity={this.increaseQuantity}
          onDecreaseQuantity={this.decreaseQuantity}
          total={this.state.inCart.reduce((sum, curr) => sum += curr.price * curr.quantity, 0)}
        />
      </div>
    )
  }
}

export default ProductSelect;