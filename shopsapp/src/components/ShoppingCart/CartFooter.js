import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Button } from '@material-ui/core';

export default (props) => (
  <div>
    <div className="cart-sum">
      <div>Total: <b>{props.total}$</b></div>
    </div>
    <div className="flex-row-center cart-buttons">
      <Button variant="contained" color="secondary" onClick={props.onClear}>
        <DeleteIcon />
        Clear Cart
      </Button>
      <Button variant="contained" color="primary" onClick={props.onConfirm}>
        <CheckIcon />
        Proceed to payment
      </Button>
    </div>
  </div>
)