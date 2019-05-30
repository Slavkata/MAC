import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';


class CampingAddPeople extends React.Component {
    state = {
        campingSpot: null,
        person1: null,
        person2: null,
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = () => {
        const data = {
            id: this.state.campingSpot,
            ticket_number: []
        }
        if (!isNaN(this.state.person1) && this.state.person1 !== null) {
            data.ticket_number.push(this.state.person1)
        }
        if (!isNaN(this.state.person2) && this.state.person2 !== null) {
            data.ticket_number.push(this.state.person2)
        }
        console.log(data);
        Axios.put('https://mac-cars.herokuapp.com/camping/', data)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire('People added', `People who will camp on ${data.id} spot have been added`, 'success');
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h1>Camping Spot #</h1>
                <input type="text" name="campingSpot" placeholder="Camping spot number" onChange={this.handleChange} />
                <h1>Bonus Guests</h1>
                <input type="text" name="person1" placeholder="Person 1 Ticket number" onChange={this.handleChange} />
                <input type="text" name="person2" placeholder="Person 2 Ticket number" style={{ marginLeft: '1rem' }} onChange={this.handleChange} />
                <button className="btn" style={{ marginLeft: '1rem' }} onClick={this.submit}>Add</button>
            </div>
        )
    }
}

export default CampingAddPeople;