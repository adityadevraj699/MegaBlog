import React from 'react';
import LogoImage from '../assets/MegaBlog.jpg';

function Logo({ width = '500px' }) {
  return (
    <div
      className="relative"
      style={{
        width,
        height: 'auto',
       
      }}
    >
      <img
      
        className="rounded-lg "
        src={LogoImage} 
        alt="Logo"
        style={{
          width,
          
          
        }}
      />
    </div>
  );
}

export default Logo;
