import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios.get('/v1/games/1/questions')
      .then(res => res.data)
      .then(questions => {
        const categories = []
        questions.forEach(question => categories.includes(question.category) ? categories : categories.push(question.category))
        this.setState({ categories })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h1> Categories featured in this Game: </h1>
          {
            categories.map(category => {
              return ( 
                <div key={category}>
                  <Link to={`/categories/${category}`}> {category} </Link> 
                </div>
              )
            })
          }
      </div>
    );
  }
}
