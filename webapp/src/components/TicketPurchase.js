import React, { Component, Fragment } from 'react'
import PersonInput from './PersonInput';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export default class TicketPurchase extends Component {
  state = {
    focused: 0,
    people: []
  }

  addPerson = () => {
    let { people } = this.state;
    people.push({
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
    });
    console.log(people);
    this.setState({ people: people, focused: people.length - 1 });
  }

  updatePerson = (data, i) => {
    let { people } = this.state;
    people[i] = {
      firstName: data.firstName,
      lastName: data.lastName,
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

  submit = () => {
    let peopleAsList = '';
    this.state.people.forEach(p => { peopleAsList += '<span>' + p.firstName + ' ' + p.lastName + '</span>' });
    let text = 'You will reserve tickets for the following <strong>' + this.state.people.length + '</strong> people <div class="dialog-list">' + peopleAsList + '</div>';
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
            text: 'Expect detailed information and your tickets delivered to your mail shortly.',
            type: 'success',
            heightAuto: false,
          }
        )
      }
    })
  }

  render() {
    console.log(this.state.focused)
    return (
      <Fragment>
        <div class="button-group-right">
          <span className="text-purple mr-1">People added: {this.state.people.length}</span>
          <button className="btn" onClick={this.addPerson}> add person </button>
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
          <span className="text-purple mr-1">whenever you are ready you may confirm your </span>
          <button className="btn" onClick={this.submit}>Purchase</button>
        </div>
      </Fragment>
    )
  }
}