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

export default function ProtectedRoute({

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
Authenticating..."
        />

      </div>

    );

  }

  /* ---------------------- */
  /* NOT AUTHORIZED */
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
  /* RENDER */
  /* ---------------------- */

  if(children){

    return children;

  }

  return <Outlet />;

}