/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const TeamsList = (props) => {
  const { teams, showAll, game } = props;
  return (
    <div className='teams'>
      <div className='team'>
        <h3 className='team-name'>Team</h3>
        {
          game ?
          <h3 className='team-secondary'> Answer </h3>
          :
          <h3 className='team-secondary'>{ showAll ? 'Email' : 'Score' }</h3>
        }
      </div>
       { teams ?
         teams.map(team => {
          return (
            <div className="team" key={team.id}>
              {
                team.team_name ?
                  <Link className='team-name' to={`/teams/${team.id}`}>{team.team_name}</Link>
                :
                  <div> Team Name N/A </div>
              }
              {
                game ?
                  <div> {team.answer ? team.answer : null } </div>
                :
                  showAll ?
                    <div className='team-secondary'>{team.email}</div>
                  :
                   <div className='team-secondary'> { team.score ? team.score : 0 } </div>
              }
            </div>
          );
        }) : null
      }
    </div>
  )
}

export default TeamsList;
