import React, { Component } from 'react'
import axios from 'axios'

export default class Reviews extends Component {

    state = {
        name: '',
        rating: 0,
        text: '',
        reviews: [],
    }

    componentDidMount() {
        axios.get('https://mac-cars.herokuapp.com/review/')
            .then(response => {
                console.log(response.data);
                this.setState({reviews: response.data})
            })
            .catch(error => { console.log(error) } );
    }

    loadReviews = () => {
        return this.state.reviews.map((r, i) => (
            <div className="review" key={i}>
                <div className="rating"><cite>{r.publisher}</cite><span>{r.rating}/5</span></div>
                <blockquote>
                {r.content}
                </blockquote>
                <div className="review-date">{r.date}</div>
            </div>
            )
        )
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitReview = () => {
        if(this.state.name == '' || this.state.rating == 0 || this.state.text == '') {
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
            .then(response => alert(response));
        }
    }

    render() {
        return (
            <div>
            {
               this.loadReviews()
            }
            <div className="review-post-wrapper">
                <div className="review-post-col">
                    <input type="text" name="name" placeholder="Name..." onChange={this.handleChange} />
                    <div>
                        Rating:
                        <select name="rating" style={{width: '80%'}} onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="review-post-col">
                    <textarea name="review" style={{width: '80%'}} name="text" onChange={this.handleChange}></textarea>
                    <button className="btn btn-small" onClick={this.submitReview}> Send review </button>
                </div>
            </div>
            </div>
        )
    }
}