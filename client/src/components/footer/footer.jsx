/*import React, { useEffect, useState } from 'react'*/
import './Footer.scss'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation } from 'react-router-dom'

const Footer = () => {

  const {pathname} =  useLocation()

  return (
    <div className= {pathname =="/" ? " " :"h hide"}>
        <footer className="footer">
    {/* <div className="waves"> 
      <div className="wave" id="wave1"></div>
      <div className="wave" id="wave2"></div>
      <div className="wave" id="wave3"></div>
      <div className="wave" id="wave4"></div>
    </div>*/}
    <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://github.com/marua15">
            <LazyLoadImage src="./img/github-icon.png" alt="" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://github.com/HAITAME">
          <LazyLoadImage src="./img/github-icon.png" alt="" />
        </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://github.com/SoukainaElidrissi">
          <LazyLoadImage src="./img/github-icon.png" alt="" />
        </a>
        </li>
      
    </ul>
    <ul className="menu">
        <li className="menu__item"><a className="menu__link" href="#feat">Home</a></li>
        <li className="menu__item"><a className="menu__link" href="#ab">About</a></li>
        <li className="menu__item"><a className="menu__link" href="#price">Pricing</a></li>
    </ul>

    <p>&copy;2023 <span className='logoo'><strong>Parking</strong></span>   | All Rights Reserved</p>

  </footer>
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  )
}

export default Footer