// Example of a simple component, Home.js
import React from 'react';
import CounterComponent from './CounterComponent';

function Home() {
  return (
    <div>
      <div className="bg-red-200">
        <CounterComponent />
      </div>
    </div>
  );
}

export default Home;
