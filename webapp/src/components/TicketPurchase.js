import React, { Component, Fragment } from 'react'
import PersonInput from './PersonInput';

export default class TicketPurchase extends Component {
  state = {
    uniqueIndex: 1,
    people: []
  }

  componentDidMount() {
    this.addPerson();
  }

  addPerson = () => {
    let { people } = this.state;
    people.push({
      id: this.state.uniqueIndex,
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
    });
    console.log(people);
    this.setState({ uniqueIndex: this.state.uniqueIndex + 1, people: people });
  }

  removePerson = (person) => {
    let { people } = this.state;
    people.splice(people.indexOf(person), 1);
    this.setState({ people: people });
  }

  render() {
    return (
      <Fragment>
        <div className="flex-boxes">
          {
            this.state.people.map(p => (
              <PersonInput
                allowRemove={p.id === 1}
                onRemove={() => this.removePerson(p)}
                key={p.id}
              />
            ))
          }
        </div>
        <button onClick={this.addPerson}> Add </button>
      </Fragment>
    )
  }
}