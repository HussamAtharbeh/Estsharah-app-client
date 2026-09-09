import React from 'react';
import { getUser, homePathFor, isLoggedIn } from '../../utils/auth';

const ProtectedRoute = ({ role, children }) => {
  const user = getUser();

  if (!isLoggedIn()) {
    window.location.href = '/signin';
    return null;
  }

  if (role && user?.role !== role) {
    window.location.href = homePathFor(user?.role);
    return null;
  }

  return children;
};

export default ProtectedRoute;