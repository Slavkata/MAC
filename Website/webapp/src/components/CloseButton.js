import React from 'react'
import PropTypes from 'prop-types';


const CloseButton = (props) =>
  <button
    className="round-but remove-but"
    onClick={props.onRemove}
    disabled={!props.allowRemove || false}
  >
    &#10007;
  </button >

PropTypes.CloseButton = {
  onRemove: PropTypes.func,
  allowRemove: PropTypes.bool,
}

export default CloseButton;