// Example of a simple component, Home.js
import React from 'react';
import UserComponent from './UserComponent';

function About() {
  return (
    <div className="bg-red-200">
      <UserComponent userId={1} />
    </div>
  );
}

export default About;
