import React, { createContext,useState } from 'react'

export const UserContext = createContext();

export const UserProvider=({children}) => {
    const[isLoggedIn,setIsLoggedIn]=useState(false);   //CHANGE IT AFTER DONE WITH FINDBUDDY PAGE COMPLETION  
    const[userDetails,setUserDetails]=useState(null);
    const[searchHistory,setSearchHistory]=useState([]);
  return (
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,userDetails,setUserDetails,searchHistory,setSearchHistory}}>
        {children}
    </UserContext.Provider>
  )
}


