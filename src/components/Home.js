import React from 'react';

const Home = (props) => {
  return (
    <div>
      <h1> Welcome, {props.bar.name} </h1>
      <button> Start a Game </button>
    </div>
  )
}

export default Home;

