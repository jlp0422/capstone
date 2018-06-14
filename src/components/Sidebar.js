import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({bar}) => {
  return (
    <div className="sidebar container-fluid">
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/categories"> Categories </NavLink>
      <NavLink to="/teams"> Teams </NavLink>
      <NavLink to="/games/active"> Active Game </NavLink>
      <NavLink to="/GlobalStats">Global Stats</NavLink>
      <NavLink to="/LocalStats">Local Stats</NavLink>
      <NavLink to="/checkout"> Buy Membership </NavLink>
      <div className="membershipDate">
        {
          bar.endOfMembershipDate !== 'Invalid date' && bar.endOfMembershipDate !== null ? (

            <p>Membership end date:<br/>{bar.endOfMembershipDate}</p>

          ) : (null)
        }
      </div>
    </div>
  );
};

export default Sidebar;
