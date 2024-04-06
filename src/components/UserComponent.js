import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../features/users/userSlice';
import PropTypes from 'prop-types';

function UserComponent({ userId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (loading === 'loading') return <div>Loading...</div>;

  return <div>{user ? user.name : 'User not found'}</div>;
}

export default UserComponent;

// Define prop types
UserComponent.propTypes = {
  userId: PropTypes.number.isRequired,
  // Use PropTypes.string if userId is expected to be a string
};
