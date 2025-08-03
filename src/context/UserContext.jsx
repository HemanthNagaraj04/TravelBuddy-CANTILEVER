import React, { createContext,useState } from 'react'

export const UserContext = createContext();

export const UserProvider=({children}) => {
    const[isLoggedIn,setIsLoggedIn]=useState(true);   //CHANGE IT AFTER DONE WITH FINDBUDDY PAGE COMPLETION  
    const[userDetails,setUserDetails]=useState(null);
  return (
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,userDetails,setUserDetails}}>
        {children}
    </UserContext.Provider>
  )
}


