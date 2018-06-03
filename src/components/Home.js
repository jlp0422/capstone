import React from 'react';

const Home = (props) => {
  return (
    <div className='home'>
      <h1> Cheers, {props.bar.name} </h1>
      <img className='home-img' width='500' height='500' src='/public/images/UTT-logo.svg' />
      <br/>
      <button onClick={props.startGame}> Click to Start a Game </button>
    </div>
  )
}

export default Home;

