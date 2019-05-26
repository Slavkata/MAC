import React from 'react';
import { Link } from 'react-router-dom';

export default () =>
    <div style={{ width: '50%', margin: '10rem auto' }}>
        <h1>Choose an option: </h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

            <Link to="/camping" className="btn">New Camping Spot</Link>
            <Link to="/add-camping" className="btn">Add People To My Spot</Link>
        </div>
    </div>
