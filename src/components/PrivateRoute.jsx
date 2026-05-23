import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // use !!token to return boolean only, doesnt return token value from localStorage
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
