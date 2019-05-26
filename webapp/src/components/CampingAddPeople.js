import React from 'react';


class CampingAddPeople extends React.Component {
    render() {
        return (
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h1>Camping Spot #</h1>
                <input type="text" name="campingSpot" placeholder="Camping spot number" />
                <h1>Bonus Guests</h1>
                <input type="text" name="person1" placeholder="Person 1 Ticket number" />
                <input type="text" name="person2" placeholder="Person 2 Ticket number" style={{ marginLeft: '1rem' }} />
                <button class="btn" style={{ marginLeft: '1rem' }}>Add</button>
            </div>
        )
    }
}

export default CampingAddPeople;