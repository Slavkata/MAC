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
  }

  getShopInfo = (e) => {
    if (e.key !== 'Enter') return;
    let { value } = e.target;
    if (!isNaN(value)) {
      const url = '/shop';
      Axios.get(url, { params: { id: value } })
        .then(res => {
          const { id, name } = res.data;
          this.setState({ id, name });
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="App" >
        <ShopNumberInput onInput={this.getShopInfo} shopId={this.state.id} shopName={this.state.name} />
        {this.state.id !== -1 && <ProductSelect />}
        {this.state.id === -1 && <span>Please input shop number first</span>}
      </div>
    );
  }
}

export default App;
