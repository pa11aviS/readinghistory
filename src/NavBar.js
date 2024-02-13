import React from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai'; // Assuming you have this icon component

const NavBar = () => {
  return (
    <nav style={{ gap: '0.2rem', paddingTop: 0, paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', borderBottom: '4px solid grey', color: 'grey', '@media (min-width: 768px)': { justifyContent: 'center', gap: '1rem' }, '@media (min-width: 1024px)': { gap: '1rem' } }}>
      <img src="./compass.png" style={{ maxHeight: '2.5rem' }} alt="Compass Logo" />
      <a href="https://octant-rho.vercel.app/" style={{ fontSize: '1rem', fontFamily: 'BoskaBlack', cursor: 'pointer', color: 'grey', textDecoration: 'none', '@media (min-width: 768px)': { fontSize: '1.2rem' } }}><h1>Home</h1></a>
      <a href="https://octant-rho.vercel.app/projects" style={{ fontSize: '1rem', fontFamily: 'BoskaBlack', cursor: 'pointer', color: 'grey', textDecoration: 'none', '@media (min-width: 768px)': { fontSize: '1.2rem' } }}><h1>Projects</h1></a>
      <a href="https://octant-rho.vercel.app/travelogues" style={{ fontSize: '1rem', fontFamily: 'BoskaBlack', cursor: 'pointer', color: 'grey', textDecoration: 'none', '@media (min-width: 768px)': { fontSize: '1.2rem' } }}><h1>Travelogues</h1></a>
      <a href="https://octant-rho.vercel.app/contact" style={{ fontSize: '1rem', fontFamily: 'BoskaBlack', cursor: 'pointer', color: 'grey', textDecoration: 'none', '@media (min-width: 768px)': { fontSize: '1.2rem' } }}><h1>Contact</h1></a>
    </nav>
  );
};

export default NavBar;