import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logoutAction } from "../store/actions/userAction";
import Cookies from 'js-cookie';

export const Authenticate = ({ children }) => {
  const isAuthenticated = useSelector(state => state.userReducer.isLogin);

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return children;
};

export const NotAuthenticate = ({ children }) => {
    const isAuthenticated = useSelector(state => state.userReducer.isLogin);
  
    if (isAuthenticated) {
      // Redirect to the login page if not authenticated
      return <Navigate to="/" />;
    }
  
    // Render children if authenticated
    return children;
};
export const AuthenticateAdmin = ({ children }) => {
  const isAuthenticatedAdmin = useSelector(state => state.adminReducer.isLogin);
  if (!isAuthenticatedAdmin) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/admin/login" />;
  }

  // Render children if authenticated
  return children;
};

export const authMiddleware = (dispatch) => {
  // let refreshToken = Cookies.get('refresh-token');
  // if (!refreshToken) {
  //   dispatch(logoutAction())
  //   console.log(3)
  // } else {
  //   console.log(2)
  // }

};
