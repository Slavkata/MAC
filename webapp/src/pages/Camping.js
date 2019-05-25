import React, { Component } from 'react';
import TicketNumberInput from '../components/TicketNumberInput';
import MapSelect from '../components/MapSelect';
import TicketNumberInfo from '../components/TicketNumberInfo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

class Camping extends Component {

  campingTypes = [
    {
      id: 0,
      name: 'Small tent',
      maxPeople: 3,
      image: '/images/small_tent.png',
      description: "A small red tent, placed near a toilet that will provide housing for 3 adult people."
    },
    {
      id: 1,
      name: 'Big tent',
      maxPeople: 6,
      image: '/images/big_tent.png',
      description: "A bigger tent that has double the space and therefore double the number of beds. Can accomodate up to 6 people."
    }
  ]

  state = {
    tentType: 0,
    region: 'A1',
    people: [],
    errors: [],
  }

  componentDidMount() {
    const ticketNr = this.props.match.params.ticketNr;
    console.log(ticketNr);
    if (ticketNr !== undefined &&
      ticketNr !== null &&
      !isNaN(ticketNr) &&
      ticketNr.length === 6) {
      let { people } = this.state;
      people.push(ticketNr);
      this.setState({ people, ...this.state });
    }
  }

  displayErrors = (errors) => {
    let all = [];
    errors.forEach(err => {
      all.push(err);
    });
    this.setState({ errors: all });
  }

  addPerson = (ticketNr) => {
    let { people } = this.state;
    if (!this.isThereRoom()) {
      this.displayErrors(['You already filled up the available space in tent']);
    } else if (people.indexOf(ticketNr) !== -1) {
      this.displayErrors(['This person was already added']);
    } else if (ticketNr === '') {
      this.displayErrors(['Please add ticket number']);
    } else if (ticketNr.length !== 6) {
      this.displayErrors(['Your ticket number has to be 6 digits long']);
    } else {
      people.push(ticketNr);
      this.setState({ people: people, errors: [] });
    }
  }

  removePerson = (person) => {
    let { people } = this.state;
    let index = people.indexOf(person);
    people.splice(index, 1);
    this.setState({ people: people, errors: [] });
  }

  changeType = (id) => {
    if (this.campingTypes.find(t => t.id === id)) {
      this.setState({ tentType: id, errors: [] }, this.validateNumberOfPeople);
    }
  }

  validateNumberOfPeople = () => {
    const tentMaxPeople = this.campingTypes[this.state.tentType].maxPeople;
    if (this.state.people.length > tentMaxPeople) {
      let { people } = this.state;
      people.splice(tentMaxPeople - 1, people.length - tentMaxPeople);
      this.setState({ people: people });
    }
  }

  selectRegion = (region) => {
    console.log(`change region to ${region}`)
    this.setState({ region: region, errors: [] });
  }

  isThereRoom = () => {
    let { maxPeople } = this.campingTypes[this.state.tentType];
    let currentPeople = this.state.people.length;
    return currentPeople < maxPeople;
  }

  submit = () => {
    if (this.state.people.length === 0) {
      MySwal.fire({
        type: 'error',
        title: 'No people added',
        text: 'Please add people who will use the spot before reserving',
        heightAuto: false,
      });
      return;
    }
    let peopleAsList = '';
    this.state.people.forEach(p => { peopleAsList += '<span>' + p + '</span>' });
    console.log(peopleAsList);
    let text = 'You will reserve spots for the following <strong>' + this.state.people.length + '</strong> people <div class="dialog-list">' + peopleAsList + '</div>';
    MySwal.fire({
      title: 'Are you ready?',
      html: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#792FBA',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comfirm',
      heightAuto: false,
    }).then((result) => {
      if (result.value) {
        MySwal.fire(
          {
            title: 'Your reservation has been made!',
            text: 'Expect detailed information and your camping tickets delivered to your mail.',
            type: 'success',
            heightAuto: false,
          }
        )
      }
    })
  }

  render() {
    return (
      <div>
        {/* <Navigation /> */}
        <div className="container">
          <h1>Select Spot</h1>
          <MapSelect selected={this.state.region} onRegionChange={this.selectRegion} />
          <h1>Who is going to use the space?</h1>
          <TicketNumberInput
            onAdd={this.addPerson}
          />

          <div className="errors">
            {
              this.state.errors.map(e => (
                <span className="error-msg" key={e}>{e}</span>
              ))
            }
          </div>
          <div className="text-purple">
            People added ({`${this.state.people.length}/${this.campingTypes[this.state.tentType].maxPeople}`})
          </div>
          <div className="flex-row">
            {this.state.people.map((p, i) => (
              <TicketNumberInfo key={i} number={p} onRemove={this.removePerson} />
            ))}
          </div>
          <div className="button-group-right">
            <span className="text-purple mr-1"> when you are happy... </span>
            <button className="btn" onClick={this.submit}>Reserve your spots</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Camping;