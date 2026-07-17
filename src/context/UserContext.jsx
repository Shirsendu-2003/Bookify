import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import providerService from
"../services/providerService";

import authService from
"../services/authService";

const UserContext =
  createContext(null);

export function UserProvider({

  children,

}) {

  const [profile,setProfile] =
    useState(null);

  const [loading,setLoading] =
    useState(true);

  const [notifications,
    setNotifications
  ] = useState(0);

  const [preferences,
    setPreferences
  ] = useState({

    language:"en",

    emailNotifications:true,

    smsNotifications:false,

  });

  /* ---------------------- */
  /* INITIALIZE */
  /* ---------------------- */

  useEffect(()=>{

    initialize();

  },[]);

  const initialize =
    async()=>{

    try{

      if(

        !authService
        .isAuthenticated()

      ){

        setLoading(false);

        return;

      }

      const user =
  await authService.me();



setProfile({

  firstName:
    user?.firstName || "",

  lastName:
    user?.lastName || "",

  email:
    user?.email || "",

  phone:
    user?.phone || "",

  role:
    user?.role ||

    user?.roles?.[0] ||

    "ROLE_CUSTOMER",

  ...user,

});

      const storedPrefs =

        localStorage.getItem(
          "preferences"
        );

      if(storedPrefs){

        setPreferences(

          JSON.parse(
            storedPrefs
          )

        );

      }

    }catch(error){

      console.error(

        "User init error:",

        error

      );

    }finally{

      setLoading(false);

    }

  };

  /* ---------------------- */
  /* REFRESH PROFILE */
  /* ---------------------- */

  const refreshProfile =
    async()=>{

    try{

      const data =

        await authService
        .me();

      setProfile(data);

      return data;

    }catch(error){

      throw error;

    }

  };

  /* ---------------------- */
  /* UPDATE PROFILE */
  /* ---------------------- */

  const updateProfile =
async(payload)=>{

  try{

    let updated;

    if(

      profile?.role ===
      "ROLE_PROVIDER"

    ){

      const provider =

        await providerService
          .getProfile();

      updated =

        await providerService
          .updateProfile(

            provider.id,

            payload

          );

    }else{

      updated =

        await authService
          .updateProfile(
            payload
          );

    }

   setProfile(prev=>({
  ...prev,
  ...updated,
}));

    return updated;

  }catch(error){

    throw error;
  }
};

  /* ---------------------- */
  /* PREFERENCES */
  /* ---------------------- */

  const updatePreferences =
    (updates)=>{

    const next = {

      ...preferences,

      ...updates,

    };

    setPreferences(next);

    localStorage.setItem(

      "preferences",

      JSON.stringify(next)

    );

  };

  /* ---------------------- */
  /* NOTIFICATIONS */
  /* ---------------------- */

  const incrementNotifications =
    ()=>{

    setNotifications(

      (prev)=>prev+1

    );

  };

  const clearNotifications =
    ()=>{

    setNotifications(0);

  };

  /* ---------------------- */
  /* MEMO */
  /* ---------------------- */

  const value =
    useMemo(()=>({

      profile,

      loading,

      notifications,

      preferences,

      refreshProfile,

      updateProfile,

      updatePreferences,

      incrementNotifications,

      clearNotifications,

    }),[

      profile,

      loading,

      notifications,

      preferences,

    ]);

  return(

    <UserContext.Provider
      value={value}
    >

      {children}

    </UserContext.Provider>

  );

}

/* ---------------------- */
/* HOOK */
/* ---------------------- */

export function useUserContext(){

  const context =
    useContext(
      UserContext
    );

  if(!context){

    throw new Error(

      "useUserContext must be used inside UserProvider"

    );

  }

  return context;

}

const updateProfile = async (payload) => {

  try {

    const updated =
      await authService
        .updateProfile(payload);

    setProfile(prev => ({

      ...prev,

      ...updated,

    }));

    return updated;

  } catch (error) {

    throw error;

  }

};