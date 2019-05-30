import React from 'react'
import ItemTable from '../ItemTable/ItemTable';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import QRReader from '../QRReader/QRReader';

const MySwal = withReactContent(Swal);

class ProductSelect extends React.Component {

  state = {
    sortByCategory: false,
    available: [
      // { id: 1, name: 'Coca Cola', price: 2.99, category: "Alchohol", left: 233 },
      // { id: 2, name: 'Chio Chips', price: 6.99, category: "Food", left: 5 },
      // { id: 3, name: 'French Fries', price: 8.99, category: "Food", left: 444 },
      // { id: 3, name: 'Vodka', price: 7.99, category: "Alchohol", left: 17 },
    ],
    filtered: [],
    inCart: [],
  }

  showSwal = {
    qrScan: () => {
      MySwal.fire({
        title: 'Scan QR Code',
        type: 'warning',
        html: <QRReader onScan={this.sendPayRequest} />,
        showConfirmButton: false,
        showCancelButton: true,
      });
    },
    scanComplete: () => {
      MySwal.fire({
        title: 'Scan complete',
        type: 'success',
        html: 'Payment request is being sent to the server...',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
    },
    error: () => {
      MySwal.fire({
        title: 'Error occurred',
        type: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Okay'
      })
    },
    purchaseComplete: () => {
      MySwal.fire({
        title: 'Purchase complete',
        type: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Clear Cart'
      })
        .then(this.clearCart)
        .then(this.fetchItems);
    }
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    const copyAvailableToFiltered = () => {
      this.setState({ filtered: this.state.available });
    }

    Axios.get('https://mac-cars.herokuapp.com/shop-item', { params: { shop: this.props.shopId } })
      .then(res => {
        const { data } = res;
        this.setState({ available: data }, copyAvailableToFiltered);
      });
  }

  filter = (e) => {
    const cleaned = (string) => {
      return string.toLowerCase().split(' ').join('');
    }
    let { value } = e.target;
    this.setState({ filtered: this.state.available.filter(item => cleaned(item.name).includes(cleaned(value))) });
  }

  sortByCategory = () => {
    let { sortByCategory, filtered } = this.state;
    sortByCategory = !sortByCategory;
    if (sortByCategory) {
      filtered.sort((a, b) => a.category > b.category ? 1 : -1)
    } else {
      filtered.sort((a, b) => a.id > b.id ? 1 : -1)
    }
    this.setState({ sortByCategory, filtered });
  }

  onItemAdd = (itemId) => {
    let { available, inCart } = this.state;
    let inCartItem = inCart.find(item => item.id === itemId);
    if (inCartItem !== null && inCartItem !== undefined) {
      this.increaseQuantity(itemId);
      return;
    }
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

  removeFromCart = (itemId) => {
    let { inCart } = this.state;
    let index = inCart.findIndex(item => item.id === itemId);
    inCart.splice(index, 1);
    this.setState({ inCart });
  }

  clearCart = () => {
    this.setState({ inCart: [] })
  }

  sendPayRequest = (ticketNumber) => {
    // Close qrScan swal
    MySwal.close();

    this.showSwal.scanComplete();
    MySwal.showLoading();


    const data = {
      ticket_number: ticketNumber.code,
      id: this.state.inCart.reduce((arr, item) => {
        for (let i = 0; i < item.quantity; i++) {
          arr.push(item.id);
        }
        return arr;
      }, [])
    }

    Axios.put('https://mac-cars.herokuapp.com/shop-item/', data)
      .then(res => {
        MySwal.close();
        if (res.data === null)
          this.showSwal.purchaseComplete();
        else
          this.showSwal.error();
      })
      .catch(e => {
        console.error(e);
        MySwal.close();
        this.showSwal.error();
      })
  }

  submitOrder = () => {
    this.showSwal.qrScan();
  }

  render() {
    return (
      <div className="container">
        <ItemTable
          filtered={this.state.filtered}
          onItemAdd={this.onItemAdd}
          onFilterChange={this.filter}
          onCategorySort={this.sortByCategory}
          sortedByCategory={this.state.sortByCategory}
        />
        <ShoppingCart
          inCart={this.state.inCart}
          onIncreaseQuantity={this.increaseQuantity}
          onDecreaseQuantity={this.decreaseQuantity}
          onRemove={this.removeFromCart}
          onClear={this.clearCart}
          onSubmit={this.submitOrder}
          total={this.state.inCart.reduce((sum, curr) => sum += curr.price * curr.quantity, 0)}
        />
      </div>
    )
  }
}

export default ProductSelect;