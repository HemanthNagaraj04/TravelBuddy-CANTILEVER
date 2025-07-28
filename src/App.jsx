import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import TripPlaner from './pages/TripPlaner/TripPlaner'
import { ToastContainer } from 'react-toastify'
import SignIn from './pages/SignIn/SignIn'
import { useState } from 'react'
import FindBuddy from './pages/FindBuddy/FindBuddy'
import ProtectedRoutes from './pages/Home/ProtectedRoutes'

const App = () => {
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/Home',
      element:<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      path:'/About',
      element:<About />
    },
    {
      path:'/TripPlaner',
      element:<ProtectedRoutes isLoggedIn={isLoggedIn}> <TripPlaner isLoggedIn={isLoggedIn}/> </ProtectedRoutes>
    },{
      path:'/signin',
      element:<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    },{
      path:'/findabuddy',
      element:<ProtectedRoutes isLoggedIn={isLoggedIn}> <FindBuddy /></ProtectedRoutes>
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
