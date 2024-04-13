/* eslint-disable */
import React from 'react';
import UserComponent from '../components/UserComponent';
import RootLayout from './RootLayout';

function About() {
  return (
    <RootLayout>
      <UserComponent userId={1} />
    </RootLayout>
  );
}

export default About;
