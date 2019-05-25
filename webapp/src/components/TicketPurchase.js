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
    })
      .then(() => {
        this.fireCampingSpotsMessage(data);
      })
  }

  fireCampingSpotsMessage = (data) => {
    MySwal.fire({
      title: 'Would you like to reserve camping spot for the event?',
      html: 'Having a camping spot will let you spend the night with us and skip all the check in and travelling to your place.',
      confirmButtonText: 'Yes, I want a camping spot',
      cancelButtonText: 'No, thanks',
      cancelButtonColor: '#a50d0d',
      confirmButtonColor: '#659b26',
      showCancelButton: true,
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
      title: 'Would you like to deposit money to your account?',
      html: 'We don\'t use cash on the event. If you want to purchase something you have to have it in your cashless balance. Deposit now?',
      confirmButtonText: 'Yes, deposit',
      cancelButtonText: 'No, thanks',
      cancelButtonColor: '#a50d0d',
      confirmButtonColor: '#659b26',
      showCancelButton: true,
    }).then(depRes => {
      if (depRes.value) {
        this.props.history.push(`/deposit/${data[0].ticket_number}`);
      }
    })
  }

  submit = () => {
    let peopleAsList = '';
    this.state.people.forEach(p => { peopleAsList += '<span>' + p.firstname + ' ' + p.lastname + '</span>' });
    let text = 'You will reserve tickets for the following <strong>' + this.state.people.length + '</strong> people <div class="dialog-list">' + peopleAsList + '</div>';

    MySwal.fire({
      title: 'Confirm purchase?',
      html: text,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return Axios.post('https://mac-cars.herokuapp.com/ticket/', this.getRequestObject())
          .then(response => {
            console.log('response', response);
            return response
          });
      },
      allowOutsideClick: () => !MySwal.isLoading()
    }).then((result) => {
      if (result.value) {
        let { data } = result.value;
        console.log('value', result.value);
        this.fireSuccessMessage(data);
      }
    })
  }

  render() {
    return (
      <Fragment>
        <div className="button-group-right">
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