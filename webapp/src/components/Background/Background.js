import React from 'react'

const styles = {
  background: {
    backgroundImage: `url(images/background3.jpg)`,
    backgroundSize: 'cover',
    filter: 'blur(5px)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
    zIndex: -10,
  },
}

export default () => (
  <div style={styles.background}></div>
)
