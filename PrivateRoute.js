import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoutes= ({ element, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Outlet {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoutes