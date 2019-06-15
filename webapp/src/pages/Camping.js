import React, { Component } from 'react';
import TicketNumberInput from '../components/TicketNumberInput';
import MapSelect from '../components/MapSelect';
import TicketNumberInfo from '../components/TicketNumberInfo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

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
  ]

  state = {
    id: 1,
    tentType: 0,
    region: 'A1',
    people: [],
    errors: [],
  }

  getTicketNr = () => {
    const ticketNr = this.props.match.params.ticketNr;
    if (
      ticketNr !== undefined &&
      ticketNr !== null &&
      !isNaN(ticketNr) &&
      ticketNr.length === 6
    )
      return ticketNr;
    else
      return false;
  }

  componentDidMount() {
    const ticketNr = this.getTicketNr();
    console.log(ticketNr);
    if (ticketNr) {
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

  selectRegion = (region, id) => {
    this.setState({ region: region, id, errors: [] });
  }

  isThereRoom = () => {
    let { maxPeople } = this.campingTypes[this.state.tentType];
    let currentPeople = this.state.people.length;
    return currentPeople < maxPeople;
  }

  showSuccessMessage = () => {
    MySwal.fire(
      {
        title: 'Your reservation has been made!',
        text: 'Expect detailed information and your camping tickets delivered to your mail.',
        type: 'success',
        heightAuto: false,
      }
    ).then(() => {
      let ticketNr = this.getTicketNr();
      if (ticketNr) {
        MySwal.fire(
          {
            title: 'Deposit money into your account?',
            text: 'We don\'t use cash on the event. If you want to purchase something you have to have it in your cashless balance. Deposit now?',
            type: 'question',
            type: 'question',
            confirmButtonText: 'Yes, deposit',
            cancelButtonText: 'No, thanks',
            confirmButtonColor: '#792FBA',
            showCancelButton: true,
            heightAuto: false,
          }).then(depRes => {
            if (depRes.value) {
              this.props.history.push(`/registration/${ticketNr}`);
            }
          });
      }
    });
  }

  showNoPeopleMessage = () => {
    MySwal.fire({
      type: 'error',
      title: 'No people added',
      text: 'Please add people who will use the spot before reserving',
      heightAuto: false,
    });
  }

  showPaymentMessage = () => {
    MySwal.fire({
      title: 'Your payment info',
      html: `
      <h1> Price: 75€</h1>
      <div class="input-box">
        <input type="text" placeholder="Card number">
        <input type="text" placeholder="Card Holder Name">
        <div class="input-box-row" style="align-items: center">
          <input type="text" placeholder="MM" style="width: 25%">
          <input type="text" placeholder="YY" style="width: 25%">
          <input type="text" placeholder="CVC" style="width: 25%">
        </div>
      </div>
      `,
      type: 'info',
      heightAuto: false,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#792FBA',
      preConfirm: () => {
        let data = { id: this.state.id, ticket_number: this.state.people };
        return Axios.put('https://mac-cars.herokuapp.com/camping/', data)
          .then(response => {
            return response
          });
      },
      allowOutsideClick: () => !MySwal.isLoading()
    })
      .then(result => {
        if (result.value) {
          this.showSuccessMessage();
        }
      })
  }

  showConfirmMessage = () => {
    let peopleAsList = '';
    this.state.people.forEach(p => { peopleAsList += '<span>' + p + '</span>' });
    let text = 'You will reserve spots for the following <strong>' + this.state.people.length + '</strong> people <div class="dialog-list">' + peopleAsList + '</div>';
    MySwal.fire({
      title: 'Confirm reservation?',
      html: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#792FBA',
      confirmButtonText: 'Confirm',
      heightAuto: false,
    }).then((result) => {
      if (result.value) {
        this.showPaymentMessage();
      }
    })
  }

  submit = () => {
    if (this.state.people.length === 0) {
      this.showNoPeopleMessage();
      return;
    }
    this.showConfirmMessage();
  }

  render() {
    return (
      <div>
        {/* <Navigation /> */}
        <div className="container">
          <h1>Select Spot</h1>
          <MapSelect selected={this.state.region} onRegionChange={this.selectRegion} revertedSpots={false} />
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

export default withRouter(Camping);