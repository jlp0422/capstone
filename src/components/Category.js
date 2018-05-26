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
    const categoryId =
      location.hash.slice(location.hash.lastIndexOf('/') + 1) * 1;
    axios
      .get('/v1/categories')
      .then(res => res.data)
      .then(_categories => _categories.trivia_categories)
      .then(categories =>
        categories.map(category => {
          category.id === categoryId ? this.setState({ category }) : null;
        })
      )
      .then(() => {
        axios
          .get('/v1/api')
          .then(res => res.data)
          .then(_questions => _questions.results)
          .then(questions =>
            questions.map(question => {
              question.category === this.state.category.name
                ? this.setState({
                    questions: [...this.state.questions, question]
                  })
                : null;
            })
          );
      });
  }

  render() {
    console.log(this.state);
    const { category, questions } = this.state;
    return (
      <div>
        <h1>{category.name}</h1>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question.question}</li>
          ))}
        </ul>
      </div>
    );
  }
}
