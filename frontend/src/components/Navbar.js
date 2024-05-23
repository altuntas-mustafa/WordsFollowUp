// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../firebase';

function Navbar({ user }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f8f8f8', borderBottom: '1px solid #ccc' }}>
      <div>
        <Link to="/learn" style={{ marginRight: '20px' }}>Words to Learn</Link>
        <Link to="/known">Known Words</Link>
      </div>
      <div>
        <span>Welcome, {user.displayName}</span>
        <button onClick={signOut} style={{ marginLeft: '20px', padding: '10px 20px', fontSize: '16px' }}>Sign Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
