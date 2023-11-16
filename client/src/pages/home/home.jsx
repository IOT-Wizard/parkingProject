import React from "react";
import "./home.scss";

const Home = () => {
   return(
    <div className="home">
      <header>
        <h1>Welcome to ParkIt</h1>
        <p>Your go-to parking solution</p>
      </header>
      <section>
        <h2>Find Parking Near You</h2>
        {/* Add a search form or any other relevant content */}
      </section>
      <section>
        <h2>Featured Parking Spaces</h2>
        {/* Add featured parking spaces */}
      </section>
      {/* Add more sections as needed */}
      <img src="./public/img/parking.jpg" alt="" />
   </div>

   )
    
  }
  
  
  export default Home