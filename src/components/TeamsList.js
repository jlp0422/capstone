/* eslint-disable */
import React from 'react';

const TeamsList = (props) => {
  // console.log('teams list props: ', props)
  const { answers, showAll, teams } = props;
  // console.log('scores: ', scores)
  // console.log('mapper: ', mapper)
  return (
    <div className='teams-list'>
      <div className='team'>
        <h3 className='team-name header'>Team</h3>
        <h3 className='team-secondary header'>{showAll ? 'Email' : 'Answer'}</h3>
        {/* !showAll && <h3 className='team-tertiary header'>Answer</h3> */}
      </div>
       { answers &&
         answers.map(answer => (
          <div key={answer.team}>
            { answer.team &&
              <div className="team">
                <div className="team-name">{answer.team}</div>
                <div className="team-secondary">{answer.answer}</div>
              </div>
            }
          </div>
        ))
      }
      { teams &&
        teams.map(team => (
          <div className="team" key={team.team_name}>
            <div>{team.team_name}</div>
            { showAll ? (
              <div className='team-secondary'>{team.email}</div>
            ) : (
              <div className='team-secondary'> { team.score ? team.score : 0 } </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default TeamsList;
