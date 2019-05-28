import React from 'react';
import ShopNumberInput from './components/ShopNumberInput/ShopNumberInput';

import './index.css';
import ProductSelect from './components/ProductSelect/ProductSelect';

function App() {
  return (
    <div className="App">
      <ShopNumberInput />
      <ProductSelect />
    </div>
  );
}

export default App;
