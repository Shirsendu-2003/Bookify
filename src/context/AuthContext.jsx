import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService
from "../services/authService";

const AuthContext =
createContext(null);

export function AuthProvider({

children,

}) {

const [user,setUser]=
useState(null);

const [loading,setLoading]=
useState(true);

/* INITIAL LOAD */

useEffect(()=>{

initializeAuth();

},[]);

const initializeAuth=
async()=>{

try{

if(

authService
.isAuthenticated()

){

const me=

await authService
.me();



setUser(me);

}

}
catch(error){

console.error(
"Auth init error:",
error
);

authService.logout();

}
finally{

setLoading(false);

}

};

/* LOGIN */

const login=
async(

credentials,
remember=true

)=>{

try{

const response=

await authService
.login(

credentials,
remember

);

const me=

await authService
.me();

setUser(me);

return{

success:true,

data:response,

};

}
catch(error){

return{

success:false,

error,

};

}

};

/* REGISTER */

const register=
async(payload)=>{

try{

const response=

await authService
.register(
payload
);

return{

success:true,

data:response,

};

}
catch(error){

return{

success:false,

error,

};

}

};

/* LOGOUT */

const logout=()=>{

authService.logout();

setUser(null);

};

/* HELPERS */

const isAuthenticated=
!!user;

const hasRole=(role)=>{

return(

user?.role===role ||

user?.roles?.includes(
role
)

);

};

const getPrimaryRole=()=>{

return(

user?.role ||

user?.roles?.[0] ||

"ROLE_CUSTOMER"

);

};

/* MEMO */

const value=
useMemo(()=>({

user,

loading,

login,

register,

logout,

isAuthenticated,

hasRole,

getPrimaryRole,

}),[

user,
loading,

]);

return(

<AuthContext.Provider
value={value}
>

{children}

</AuthContext.Provider>

);

}

/* HOOK */

export function useAuthContext(){

const context=

useContext(
AuthContext
);

if(!context){

throw new Error(

"useAuthContext must be used inside AuthProvider"

);

}

return context;

}