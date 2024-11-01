import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../modules/auth/auth-provider';

interface ProtectedRouteProps {
  requiredPermission: { action: string; route: string };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredPermission }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  console.log("User authenticated:", isAuthenticated);
  console.log("User has required permission:", hasPermission(requiredPermission.action, requiredPermission.route));
  console.log("Required Action:", requiredPermission.action);
  console.log("Required Route:", requiredPermission.route);
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!hasPermission(requiredPermission.action, requiredPermission.route)) {    
    return <Navigate to="/access-denied" state={{ from: location }} replace />;

  }

  return <Outlet />;
};

export default ProtectedRoute;
