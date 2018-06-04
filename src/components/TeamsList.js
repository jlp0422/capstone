/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const TeamsList = (props) => {
  const { answers, showAll, game, teams } = props;
  // console.log(props)
  return (
    <div className='teams-list'>
      <div className='team'>
        <h3 className='team-name header'>Team</h3>
        <h3 className='team-secondary header'>{ showAll ? 'Email' : 'Answer' }</h3>
        {/* !showAll && <h3 className='team-tertiary header'>Answer</h3> */}
      </div>
       {
         answers ?
         answers.map(answer => {
          return (
            <div key={answer.team}>
              {
                answer.team ?
                  <div className="team">
                    <div className="team-name">{answer.team}</div>
                    <div className="team-secondary">{answer.answer}</div>
                    {/*<div className="team-tertiary">{answer.answer}</div>*/}
                  </div>
                :
                  <div> Team Name N/A </div>
              }
            </div>
          )
        })
        : null
      }
      {
        teams ?
          teams.map(team => {
            return (
              <div className="team" key={team.team_name}>
                <div>{team.team_name}</div>
                {
                  showAll ?
                  <div className='team-secondary'>{team.email}</div>
                :
                  <div className='team-secondary'> { team.score ? team.score : 0 } </div>
                }
              </div>
            )
          })
        : null
      }
    </div>
  )
}

export default TeamsList;
