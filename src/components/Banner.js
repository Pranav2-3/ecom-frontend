import React from 'react';
import bannerImg from '../assets/banner.jpg';

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px #000'
      }}
    >
      Super Deals on Electronics and Fashion!
    </div>
  );
};

export default Banner;
