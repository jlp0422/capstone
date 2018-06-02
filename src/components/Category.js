import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      questions: []
    };
  }

  componentDidMount() {
    this.setState({ category: location.hash.slice(location.hash.lastIndexOf('/') + 1).split('%20').join(' ')})
    axios.get('v1/games/1/questions')
      .then(res => res.data)
      .then(questions => {
        const filteredQs = questions.filter(question => question.category == this.state.category)
        this.setState({ questions: filteredQs })
      })
  }

  render() {
    const { category, questions } = this.state;
    return (
      <div>
        {
          questions.length ? 
            <div>
              <h1> Questions in {category} </h1>
              <ol>
                {
                  questions.map((question, index) => <li key={index} dangerouslySetInnerHTML={{ __html: question.question }}></li>)
                }
              </ol>
            </div>
          : 
            <h2>there are no questions in this game with this category</h2>
        }
      </div>
    );
  }
}
