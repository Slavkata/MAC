import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

export default (props) => (
  <div className="flex-row-center">
    <input type="text" className="quantity" value={props.quantity} readOnly />
    <div className="quantity-buttons">
      <IconButton aria-label="Add" size="small" onClick={() => props.onAdd(props.item.id)}>
        <AddIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="Remove" size="small" onClick={() => props.onRemove(props.item.id)}>
        <RemoveIcon fontSize="inherit" />
      </IconButton>
    </div>
  </div>
)