import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Button } from '@material-ui/core';

export default (props) => (
  <div class="cart-footer">
    <div className="cart-sum">
      <div className="total-text">Total</div><div className="total-num"> <b>{Math.round(props.total * 100) / 100}€</b></div>
    </div>
    <div className="flex-row-center cart-buttons">
      <Button variant="contained" color="secondary" onClick={props.onClear}>
        <DeleteIcon />
        Clear Cart
      </Button>
      <Button variant="contained" color="primary" onClick={props.onSubmit} disabled={props.disableConfirm}>
        <CheckIcon />
        Proceed to payment
      </Button>
    </div>
  </div>
)