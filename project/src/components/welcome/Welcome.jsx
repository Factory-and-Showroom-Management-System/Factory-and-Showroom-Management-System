import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
        <h1 style={{ color: 'black' }} className="title">Dashboard</h1>
        <h2 style={{ color: 'black' }} className="subtitle">Welcome Back ...{user && user.name}</h2>
    </div>
  )
}

export default Welcome