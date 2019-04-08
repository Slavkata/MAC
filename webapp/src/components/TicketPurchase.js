import React, { Component, Fragment } from 'react'
import PersonInput from './PersonInput';

export default class TicketPurchase extends Component {
  state = {
    focused: 0,
    uniqueIndex: 1,
    people: []
  }

  componentDidMount() {
    this.addPerson();
  }

  addPerson = (data) => {
    let { people } = this.state;
    people.push({
      id: this.state.uniqueIndex,
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
    });
    console.log(people);
    this.setState({ uniqueIndex: this.state.uniqueIndex + 1, people: people, focused: people[people.length - 1].id });
  }

  removePerson = (person) => {
    let { people } = this.state;
    people.splice(people.indexOf(person), 1);
    this.setState({ people: people, focused: people[people.length - 1].id });
  }

  focusPerson = (person) => {
    console.log('person :', person);
    this.setState({ focused: this.state.people.indexOf(person) + 1 });
  }

  render() {
    return (
      <Fragment>
        <div className="flex-boxes">
          {
            this.state.people.map(p => (
              <PersonInput
                allowRemove={p.id === 1}
                onAdd={this.addPerson}
                onRemove={() => this.removePerson(p)}
                onEdit={() => this.focusPerson(p)}
                key={p.id}
                focused={this.state.focused === p.id}
              />
            ))
          }
        </div>
      </Fragment>
    )
  }
}