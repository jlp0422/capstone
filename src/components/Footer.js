import React from 'react';
// import StickyFooter from 'react-sticky-footer';


// <StickyFooter
// bottomThreshold={50}
// stickyStyles={{
// padding: "2rem",  
// display: "grid",
// gridColumn: 1 / -1,            
// }}
// >
// {/*</StickyFooter>*/}
const Footer = ({ bar }) => {
  return (
    <div className="footer center-block">

          
            <div>
              <div>
                {
                  bar.endOfMembershipDate !== 'Invalid date' && bar.endOfMembershipDate !== null ? (
                    
                    <p>{bar.name} membership expiration date: {bar.endOfMembershipDate}</p>
                    
                  ) : (null)
                }
              </div>
              <p>&copy; UnTapped Trivia Productions | <a href="https://www.fullstackacademy.com/">Fullstack Academy</a></p>
            </div>
          
          </div>
  );
};



export default Footer;
