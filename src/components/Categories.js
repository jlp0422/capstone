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
    axios
      .get('/v1/categories')
      .then(res => res.data)
      .then(_categories => _categories.trivia_categories)
      .then(categories => this.setState({ categories }));
  }

  render() {
    const { categories } = this.state;
    return (
      <ul>
        {categories.map(category => {
          return (
            <li key={category.id}>
              <Link to={`/v1/categories/${category.id}`}>{category.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}
