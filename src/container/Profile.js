/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ProfileComponent from '../components/ProfileComponent';

function Profile() {
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ProfileComponent />
      </RootLayout>
    </div>
  );
}

export default Profile;
