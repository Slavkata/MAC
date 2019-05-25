import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export default class Reviews extends Component {

    state = {
        name: '',
        rating: 0,
        text: '',
        reviews: [],
    }

    componentDidMount() {
        this.fetchReviews();
    }

    fetchReviews = () => {
        axios.get('https://mac-cars.herokuapp.com/review/')
            .then(response => {
                console.log(response.data);
                this.setState({ reviews: response.data })
            })
            .catch(error => { console.log(error) });
    }

    nTimesEl = (times, el) => {
        let elArr = [];
        for (let i = 0; i < times; i++) {
            elArr.push({ el, i });
        }
        return elArr.map(e => <img src={e.el} alt="star" key={e.i} />);
    }

    formatDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        const newDate = new Date(date);
        return `${newDate.getDate()} ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()}`;
    }

    loadReviews = () => {
        return this.state.reviews.map((r, i) => (
            <div className="review" key={i}>
                <div className="rating">
                    <cite>
                        {r.publisher}
                        <div className="rating-stars">
                            {
                                this.nTimesEl(r.rating, 'images/star.png')
                            }
                        </div>
                        <div className="rating-stars">
                            {this.formatDate(r.date)}
                        </div>
                    </cite>
                </div>
                <blockquote>
                    {r.content}
                </blockquote>
                <div className="review-date"></div>
            </div>
        )
        )
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitReview = () => {
        if (this.state.name == '' || this.state.rating == 0 || this.state.text == '') {
            console.log('error');
            console.warn('PUT FEEDBACK HERE');
        }
        else {
            axios.post('https://mac-cars.herokuapp.com/review/',
                {
                    publisher: this.state.name,
                    rating: this.state.rating,
                    content: this.state.text,
                }
            )
                .then(response => {
                    console.log(response);
                    if (response.data.hasOwnProperty('review_id')) {
                        MySwal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Your review has been posted',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.fetchReviews();
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <h1 style={{ width: '70%', margin: '0 auto' }}>Post your review</h1>
                <table style={{ width: '50%', margin: '0 auto' }}>
                    <tbody>
                        <tr>
                            <td>Your name</td>
                            <td><input type="text" name="name" onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td><select name="rating" style={{ width: '80%' }} onChange={this.handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td>Review text</td>
                            <td><textarea name="review" style={{ width: '80%' }} name="text" onChange={this.handleChange}></textarea></td>
                        </tr>
                        <tr>
                            <td>let us know...</td>
                            <td><button className="btn btn-small" onClick={this.submitReview}> Send review </button></td>
                        </tr>
                    </tbody>
                </table>
                <h1 style={{ width: '70%', margin: '0 auto' }}>User reviews</h1>
                {
                    this.loadReviews()
                }
            </div>
        )
    }
}