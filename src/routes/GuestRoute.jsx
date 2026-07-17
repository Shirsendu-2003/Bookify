import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useAuthContext,
} from "../context/AuthContext";

import Loader from
"../components/common/Loader";

const getRedirectPath = (

  role

)=>{

  switch(role){

    case "ROLE_ADMIN":

      return "/dashboard/admin";

    case "ROLE_PROVIDER":

      return "/dashboard/provider";

    case "ROLE_CUSTOMER":

      return "/dashboard/customer";

    default:

      return "/dashboard";

  }

};

export default function GuestRoute({

  children,

}) {

  const {

    user,

    loading,

    isAuthenticated,

  } = useAuthContext();

  /* ---------------------- */
  /* LOADING */
  /* ---------------------- */

  if(loading){

    return(

      <div
        className="

min-h-screen

flex
items-center
justify-center

bg-slate-50

"
      >

        <Loader
          size="lg"
          text="
Loading Session..."
        />

      </div>

    );

  }

  /* ---------------------- */
  /* ALREADY AUTHENTICATED */
  /* ---------------------- */

  if(

    isAuthenticated &&

    user

  ){

    return(

      <Navigate

        replace

        to={
          getRedirectPath(
            user.role
          )
        }

      />

    );

  }

  /* ---------------------- */
  /* ALLOW GUEST */
  /* ---------------------- */

  if(children){

    return children;

  }

  return <Outlet />;

}