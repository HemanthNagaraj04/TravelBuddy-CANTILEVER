import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import TripPlaner from './pages/TripPlaner/TripPlaner'
import { ToastContainer } from 'react-toastify'
import SignIn from './pages/SignIn/SignIn'
import { useState } from 'react'

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
      element:<TripPlaner isLoggedIn={isLoggedIn}/>
    },{
      path:'/signin',
      element:<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
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
