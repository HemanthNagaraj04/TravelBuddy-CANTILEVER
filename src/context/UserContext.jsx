import React, { createContext,useState } from 'react'

export const UserContext = createContext();

export const UserProvider=({children}) => {
    const[isLoggedIn,setIsLoggedIn]=useState(false);   
    const[userDetails,setUserDetails]=useState(null);
    const[searchHistory,setSearchHistory]=useState([]);
    const [destination, setDestination] = useState('');
  return (
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,userDetails,setUserDetails,searchHistory,setSearchHistory,destination, setDestination}}>
        {children}
    </UserContext.Provider>
  )
}


