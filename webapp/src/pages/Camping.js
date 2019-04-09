import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import TentSelect from '../components/TentSelect';
import TicketNumberInput from '../components/TicketNumberInput';
import MapSelect from '../components/MapSelect';
import TicketNumberInfo from '../components/TicketNumberInfo';

export default class Camping extends Component {

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
    region: 0,
    people: [],
    errors: [],
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

  render() {
    return (
      <div>
        {/* <Navigation /> */}
        <div className="container">
          <MapSelect selected={this.state.region} onRegionChange={this.selectRegion} />
          <TentSelect campingTypes={this.campingTypes} selected={this.state.tentType} onTypeChange={this.changeType} />
          <div className="tent-info-box">
            <div className="info">i</div>
            {this.campingTypes[this.state.tentType].description}
          </div>
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

        </div>
      </div>
    )
  }
}