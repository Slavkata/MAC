import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class QRReader extends Component {
  state = {
    qr: {
      scanned: false,
      code: '',
    }
  }

  handleScan = data => {
    if (data) {
      this.setState({
        qr: { scanned: true, code: data }
      }, () => this.props.onScan(this.state.qr));
      console.log(data);
    }
  }

  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      < div >
        {
          !(this.state.qr.scanned && this.props.hideOnScan) &&
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            className="qr-reader"
          />
        }
      </div>
    )
  }
}

export default QRReader;