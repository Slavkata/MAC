import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import TentSelect from '../components/TentSelect';
import TicketNumberInput from '../components/TicketNumberInput';
import MapSelect from '../components/MapSelect';

export default class Camping extends Component {

  campingTypes = [
    {
      id: 0,
      name: 'Small tent',
      maxPeople: 3,
      description: "A small red tent, placed near a toilet that will provide housing for 3 adult people."
    },
    {
      id: 1,
      name: 'Big tent',
      maxPeople: 6,
      description: "A bigger tent that has double the space and therefore double the number of beds. Can accomodate up to 6 people."
    }
  ]

  state = {
    uniqueIndex: 1,
    tentType: 0,
    region: 0,
    people: [],
  }

  componentDidMount() {
    this.addPerson();
  }

  addPerson = () => {
    let { people } = this.state;
    people.push({
      id: this.state.uniqueIndex,
      personTicketNr: 0,
    });
    this.setState({ uniqueIndex: this.state.uniqueIndex + 1, people: people });
  }

  removePerson = (person) => {
    console.log('remove :', person);
    let { people } = this.state;
    people.splice(people.indexOf(person), 1);
    console.log('people :', people);
    this.setState({ people: people });
  }

  changeType = (id) => {
    if (this.campingTypes.find(t => t.id === id)) {
      this.setState({ tentType: id }, this.validateNumberOfPeople);
    }
  }

  selectRegion = (region) => {
    this.setState({ region: region });
  }

  validateNumberOfPeople = () => {
    const tentMaxPeople = this.campingTypes[this.state.tentType].maxPeople;
    if (this.state.people.length > tentMaxPeople) {
      let { people } = this.state;
      people.splice(tentMaxPeople - 1, people.length - tentMaxPeople - 1);
      this.setState({ people: people });
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          <MapSelect selected={this.state.region} onRegionChange={this.selectRegion} />
          <TentSelect campingTypes={this.campingTypes} onTypeChange={this.changeType} />
          <div className="tent-info-box">
            {this.campingTypes[this.state.tentType].description}
          </div>
          <div className="flex-boxes center-box">
            {this.state.people.map(p =>
              (
                <TicketNumberInput
                  onRemove={() => this.removePerson(p)}
                  key={p.id}
                  disabled={p.id === 1}
                />
              ))}
          </div>
          <button onClick={this.addPerson}> Add person </button>
        </div>
      </div>
    )
  }
}