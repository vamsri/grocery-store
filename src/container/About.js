/* eslint-disable */
import React from 'react';
import UserComponent from '../components/UserComponent';
import RootLayout from '../components/RootLayout';

function About() {
  return (
    <RootLayout>
      <UserComponent userId={1} />
    </RootLayout>
  );
}

export default About;
