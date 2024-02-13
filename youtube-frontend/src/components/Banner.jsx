import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Banner.css'; // Import CSS file for banner styling

function Banner() {
  return (
    <ul className="banner">
      <li className="banner-item"><Link to="/" className="banner-link">Home</Link></li>
      <li className="banner-item"><Link to="/videos" className="banner-link">Whitelisted Videos</Link></li>
      <li className="banner-item"><Link to="/channels" className="banner-link">Channel List</Link></li>
    </ul>
  );
}

export default Banner;
