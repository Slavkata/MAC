import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.links = [];
    this.links[0] = React.createRef()
    this.links[1] = React.createRef()
    this.links[2] = React.createRef()
    this.links[3] = React.createRef()
    this.links[4] = React.createRef()
  }

  state = {
    lastLocation: '',
    opened: false,
    activePage: 0,
    lineOffset: 0,
    lineWidth: 100,
  }

  componentDidUpdate() {
    if (this.state.lastLocation !== this.props.location.pathname)
      this.updateLinePosition();
  }

  componentDidMount() {
    this.updateLinePosition();
  }

  updateLinePosition = () => {
    let activePage = 0;
    switch (this.props.location.pathname) {
      case '/tickets':
        activePage = 1;
        break;
      case '/camping':
        activePage = 2;
        break;
      case '/registration':
        activePage = 3;
        break;
      case '/reviews':
        activePage = 4;
        break;
      default:
        break;
    }
    this.setState({ activePage: activePage, lastLocation: this.props.location.pathname }, this.handleExitHover);
  }

  handleExitHover = () => {
    const { activePage } = this.state;
    const activeNavEl = this.links[activePage].current;
    this.setState({ lineWidth: activeNavEl.offsetWidth, lineOffset: activeNavEl.getBoundingClientRect().x - 20 })
  }

  handleHover = (linkIndex) => (event) => {
    let offsets = event.target.getBoundingClientRect();
    this.setState({ lineWidth: this.links[linkIndex].current.offsetWidth, lineOffset: offsets.x - 20 });
  }

  setActivePage = (index) => {
    this.setState({ activePage: index });
  }

  openMobileNav = () => {
    this.setState({ opened: true });
  }

  closeMobileNav = () => {
    this.setState({ opened: false });
  }

  render() {
    return (
      <Fragment>
        <nav className="desktop-nav">
          <div className="slider" style={
            {
              transform: `translateX(${this.state.lineOffset}px)`,
              width: `${this.state.lineWidth}px`
            }
          }>
          </div>
          <div className="links">
            <div ref={this.links[0]}>
              <Link to="/"
                onMouseEnter={this.handleHover(0)}
                onMouseLeave={this.handleExitHover}
                onClick={() => this.setActivePage(0)}
              >
                Home
            </Link>
            </div>
            <div ref={this.links[1]}>
              <Link to="/tickets"
                onMouseEnter={this.handleHover(1)}
                onMouseLeave={this.handleExitHover}
                onClick={() => this.setActivePage(1)}
              >
                Tickets
            </Link>
            </div>
            <div ref={this.links[2]}>
              <Link to="/camping"
                onMouseEnter={this.handleHover(2)}
                onMouseLeave={this.handleExitHover}
                onClick={() => this.setActivePage(2)}
              >
                Camping
            </Link>
            </div>
            <div ref={this.links[3]}>
              <Link to="/registration"
                onMouseEnter={this.handleHover(3)}
                onMouseLeave={this.handleExitHover}
                onClick={() => this.setActivePage(3)}
              >
                My registration
            </Link>
            </div>
            <div ref={this.links[4]}>
              <Link to="/reviews"
                onMouseEnter={this.handleHover(4)}
                onMouseLeave={this.handleExitHover}
                onClick={() => this.setActivePage(4)}
              >
                Reviews
            </Link>
            </div>
          </div>
        </nav>
        <div className="hamburger-nav" onClick={this.openMobileNav}></div>
        <nav className="mobile-nav" style={{ left: `${this.state.opened ? '0' : '-40%'}` }}>
          <div className="close-nav" onClick={this.closeMobileNav}></div>
          <Link to="/">Home</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/camping">Camping</Link>
          <Link to="/registration">My registration</Link>
          <Link to="/reviews">Reviews</Link>
        </nav>
      </Fragment>
    )
  }
}

export default withRouter(Navigation);