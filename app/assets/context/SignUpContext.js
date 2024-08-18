import React, { createContext, useContext, useState } from 'react';

const SignUpContext = createContext();

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: ''
  });

  const [userId, setUserId] = useState(''); // Add userId state

  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData, userId, setUserId }}>
      {children}
    </SignUpContext.Provider>
  );
};
