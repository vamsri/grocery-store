/* eslint-disable */
import React from 'react';
import RootLayout from '../components/RootLayout';
import Dashboard from '../components/Dashboard';

function Home() {
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <Dashboard />
      </RootLayout>
    </div>
  );
}

export default Home;
