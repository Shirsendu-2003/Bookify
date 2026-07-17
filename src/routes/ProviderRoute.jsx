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

const PROVIDER_ROLE =
  "ROLE_PROVIDER";

export default function ProviderRoute({

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
Checking Provider Access..."
        />

      </div>

    );

  }

  /* ---------------------- */
  /* NOT AUTHENTICATED */
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
  /* INVALID ROLE */
  /* ---------------------- */

  if(

    user.role !==
    PROVIDER_ROLE

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