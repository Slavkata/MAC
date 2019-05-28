import React from 'react';
import QRReader from './components/QRReader/QRReader';
import ShopNumberInput from './components/ShopNumberInput/ShopNumberInput';
import ItemTable from './components/ItemTable/ItemTable';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

import './index.css';

function App() {
  return (
    <div className="App">
      <ShopNumberInput />
      <div className="container">
        <ItemTable />
        <ShoppingCart />
      </div>
    </div>
  );
}

export default App;
