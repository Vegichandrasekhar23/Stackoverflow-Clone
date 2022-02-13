import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="icon">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1200px-Stack_Overflow_icon.svg.png" id="stackoverflow-icon" alt="StackoverFlowIcon"></img>
          </div> 
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            <Link to='/' className="nav-link" >Home<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
            <Link to='/questions' className="nav-link" >Questions</Link>     
            </li>
            <li className="nav-item">
              <Link to='/tags' className="nav-link" >Tags</Link>
             
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link" >Company</Link>
            </li>
          </ul>
        </div>
      </nav>   
    </>
  )
}

export default Header