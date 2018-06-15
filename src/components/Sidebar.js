import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

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
      <NavLink to="/checkout"> 
        {
          moment().isBefore(bar.endOfMembershipDate) ?
          (
            <p>Extend Membership</p>
          ) : (
            <p>Buy Membership</p>
          )
        }
      </NavLink>
      <div className="membershipDate">
        <p>Membership<br />end date:<br />{bar.endOfMembershipDate}</p>
      </div>
    </div>
  );
};

export default Sidebar;
