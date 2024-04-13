/* eslint-disable */
import React from 'react';
import LeftMenu from '../components/LeftMenu';

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/4 min-h-screen">
        <LeftMenu />
      </div>
      <div className="flex w-3/4 min-h-screen">{children}</div>
    </div>
  );
}
