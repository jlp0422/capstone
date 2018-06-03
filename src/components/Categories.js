import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      questions: []
    };
  }

  componentDidMount() {
    axios.get('/v1/games/1/questions')
      .then(res => res.data)
      .then(questions => {
        const categories = []
        questions.forEach(question => categories.includes(question.category) ? categories : categories.push(question.category))
        this.setState({ categories, questions })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { categories, questions } = this.state;
    return (
      <div id='categories'>
        <div className='categories-title'>Categories featured in this Game</div>
          <div className='categories-list'>
            <div className='category'>
              <div className='category-name header'>Name</div>
              <div className='category-number header'>Num of Questions</div>
            </div>
            <br />
          {
            categories.map(category => {
              return ( 
                <div className='category' key={category}>
                  <Link className='category-name' to={`/categories/${category}`}> {category} </Link>
                  <div className='category-number'> {questions.filter(question => question.category === category).length} </div>  
                </div>
              )
            })
          }
          </div>
      </div>
    );
  }
}
