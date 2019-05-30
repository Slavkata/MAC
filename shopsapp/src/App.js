import React from 'react';
import ShopNumberInput from './components/ShopNumberInput/ShopNumberInput';
import Axios from 'axios';


import './index.css';
import ProductSelect from './components/ProductSelect/ProductSelect';

Axios.defaults.baseURL = "https://mac-cars.herokuapp.com";

class App extends React.Component {

  state = {
    id: -1,
    name: '-',
    isLoan: false,
  }

  componentDidMount() {
    const savedShopId = localStorage.getItem("shopId");
    if (!isNaN(savedShopId)) {
      this.sendRequest(savedShopId)
    }
  }

  sendRequest = (value) => {
    const url = '/shop';
    Axios.get(url, { params: { id: value } })
      .then(res => {
        const { id, name, isLoan } = res.data;
        this.setState({ id, name, isLoan });
        localStorage.setItem("shopId", id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getShopInfo = (e) => {
    if (e.key !== 'Enter') return;
    let { value } = e.target;
    if (!isNaN(value)) {
      this.sendRequest(value);
    }
  }

  render() {
    return (
      <div className="App" >
        <ShopNumberInput onInput={this.getShopInfo} shopId={this.state.id} shopName={this.state.name} />
        {this.state.id !== -1 && <ProductSelect shopId={this.state.id} isLoan={this.state.isLoan} />}
        {this.state.id === -1 && <span>Please input shop number first</span>}
      </div>
    );
  }
}

export default App;
