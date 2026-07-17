import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useAuthContext,
} from "../context/AuthContext";

import Loader from
"../components/common/Loader";

const ADMIN_ROLE =
  "ROLE_ADMIN";

export default function AdminRoute({

  children,

}) {

  const {

    user,

    loading,

    isAuthenticated,

  } = useAuthContext();

  const location =
    useLocation();

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
Checking Access..."
        />

      </div>

    );

  }

  /* ---------------------- */
  /* NOT LOGGED IN */
  /* ---------------------- */

  if(

    !isAuthenticated ||

    !user

  ){

    return(

      <Navigate

        to="/login"

        replace

        state={{
          from:location,
        }}

      />

    );

  }

  /* ---------------------- */
  /* NOT ADMIN */
  /* ---------------------- */

  if(

    user.role !==
    ADMIN_ROLE

  ){

    return(

      <Navigate

        to="/unauthorized"

        replace

      />

    );

  }

  /* ---------------------- */
  /* RENDER */
  /* ---------------------- */

  if(children){

    return children;

  }

  return <Outlet />;

}