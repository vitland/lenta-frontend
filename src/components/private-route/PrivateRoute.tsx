import {Navigate, RouteProps} from "react-router-dom";
import {Routes} from "../../types/apiRoutes";

export const PrivateRoute = (params: RouteProps) => {
  const user = localStorage.getItem('user')
  if (user) {
    return params.children;
  }
  return <Navigate to={Routes.signIn} />;
};