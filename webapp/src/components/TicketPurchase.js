import React, { Component, Fragment } from 'react'
import PersonInput from './PersonInput';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'

const MySwal = withReactContent(Swal);
const ticketPrice = 50;

class TicketPurchase extends Component {
  state = {
    focused: 0,
    people: [],
    ticketNumbers: [],
  }

  addPerson = () => {
    let { people } = this.state;
    people.push({
      firstname: '',
      lastname: '',
      email: '',
      age: 0,
    });
    console.log(people);
    this.setState({ people: people, focused: people.length - 1 }, () => console.log(this.state));
  }

  updatePerson = (data, i) => {
    let { people } = this.state;
    people[i] = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      age: data.age,
    }
    this.setState({ people: people });
  }

  removePerson = (person) => {
    let { people } = this.state;
    people.splice(people.indexOf(person), 1);
    this.setState({ people: people, focused: people.length - 1 });
  }

  focusPerson = (person) => {
    console.log('person :', person);
    this.setState({ focused: person });
  }

  getRequestObject = () => {
    return this.state.people.reduce((req, current) => {
      for (let prop in current) {
        req[prop].push(current[prop]);
      }
      req.price.push(ticketPrice);
      return req;
    },
      {
        firstname: [],
        lastname: [],
        email: [],
        age: [],
        price: [],
      });
  }

  fireSuccessMessage = (data) => {
    MySwal.fire({
      title: "Tickets bought successfully!",
      type: "success",
      html: `You have successfully purchased tickets for <b>${data.length}</b> people! Your ticket numbers:
      <ul>
        ${data.map(p => `<li>${p.firstname} ${p.lastname} #${p.ticket_number}</li>`)}
      </ul>`,
      heightAuto: false,
      confirmButtonColor: '#792FBA',
    })
      .then(() => {
        this.fireCampingSpotsMessage(data);
      })
  }

  fireCampingSpotsMessage = (data) => {
    MySwal.fire({
      title: 'Reserve camping spot?',
      html: 'Having a camping spot will let you spend the night with us and skip all the check in and travelling to your place.',
      type: 'question',
      confirmButtonText: 'Yes, I want a camping spot',
      cancelButtonText: 'No, thanks',
      confirmButtonColor: '#792FBA',
      showCancelButton: true,
      heightAuto: false,

    })
      .then(campRes => {
        if (campRes.value) {
          this.props.history.push(`/camping/${data[0].ticket_number}`);
        } else {
          this.fireDepositMessage(data);
        }
      })
  }

  fireDepositMessage = (data) => {
    MySwal.fire({
      title: 'Deposit money into your account?',
      html: 'We don\'t use cash on the event. If you want to purchase something you have to have it in your cashless balance. Deposit now?',
      type: 'question',
      confirmButtonText: 'Yes, deposit',
      cancelButtonText: 'No, thanks',
      confirmButtonColor: '#792FBA',
      showCancelButton: true,
      heightAuto: false,

    }).then(depRes => {
      if (depRes.value) {
        this.props.history.push(`/registration/${data[0].ticket_number}`);
      }
    })
  }

  showPaymentMessage = () => {
    MySwal.fire({
      title: 'Your payment info',
      html: `
      <h1> Price: ${this.state.people.length * ticketPrice}€</h1>
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
        console.log(this.getRequestObject());
        return Axios.post('https://mac-cars.herokuapp.com/ticket/', this.getRequestObject())
          .then(response => {
            console.log('response', response);
            return response
          });
      },
      allowOutsideClick: () => !MySwal.isLoading()
    })
      .then(result => {
        if (result.value) {
          let { data } = result.value;
          console.log('value', result.value);
          this.fireSuccessMessage(data);
        }
      })
  }

  confirmPurchaseMessage = () => {
    let peopleAsList = '';
    this.state.people.forEach(p => { peopleAsList += '<span>' + p.firstname + ' ' + p.lastname + '</span>' });
    let text = 'You will reserve tickets for the following <strong>' + this.state.people.length + '</strong> people <div class="dialog-list">' + peopleAsList + '</div>';

    MySwal.fire({
      title: 'Confirm purchase?',
      html: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#792FBA',
      heightAuto: false,

    }).then(() => {
      this.showPaymentMessage();
    });
  }

  submit = () => {
    if (this.state.people.length === 0) {
      MySwal.fire({
        title: 'No people added',
        html: 'Please add people you want to buy tickets for, by pressing the (+) button',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#792FBA',
        type: 'error',
        heightAuto: false,
      });
      return;
    }
    this.confirmPurchaseMessage();
  }

  render() {
    return (
      <Fragment>
        <div className="button-group-right">
          <h1 style={{ width: '80%', margin: '0 auto' }}>Purchase Tickets</h1>

          <span className="text-purple mr-1">Tickets: {this.state.people.length}</span>
          <button className="btn" onClick={this.addPerson} style={{ transform: 'scale(0.5)', padding: '20px', 'fontSize': '20pt' }}> + </button>
        </div>
        <div className="flex-boxes">
          {
            this.state.people.map((p, i) => (
              <PersonInput
                onUpdate={(data) => this.updatePerson(data, i)}
                onRemove={() => this.removePerson(p)}
                onEdit={() => this.focusPerson(i)}
                key={i}
                focused={this.state.focused === i}
              />
            ))
          }
        </div>
        <div className="button-group-right">
          <span className="text-purple mr-1">when all the ticket info is done... </span>
          <button className="btn" onClick={this.submit}>Confirm Purchase</button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(TicketPurchase);