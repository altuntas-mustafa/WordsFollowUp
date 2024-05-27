// src/components/Login.js
import React from 'react';
import { signInWithGoogle } from '../firebase';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Login;
