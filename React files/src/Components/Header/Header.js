import React from 'react'

import company_logo from "../Img/main-logo.png" ; 
import '../../Styles/Header.css';
import chipper_sage_logo from "../Img/chipper-sage-logo.png" ; 
import Logout from '../Logout/Logout';

const Header = () => {
  return (
    <div>
      <div className="header">
      <img src={company_logo} alt="" className="company-logo"/>
      <h5><span className='flowhead'>Flow Of English</span> - <span className='learnerhead'>Learner</span></h5>
      <img src={chipper_sage_logo} alt="" className="chipper-logo"/>
      {/* <div className="logout-button">
        <Logout />
      </div> */}
    </div>
    </div>
  )
}

export default Header
