import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import TripPlaner from './pages/TripPlaner/TripPlaner'
import { ToastContainer } from 'react-toastify'
import SignIn from './pages/SignIn/SignIn'
import { useState } from 'react'
import FindBuddy from './pages/FindBuddy/FindBuddy'
import ProtectedRoutes from './pages/Home/ProtectedRoutes'
import { UserProvider } from './context/UserContext'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/Home',
      element: <Home/>
    },
    {
      path: '/About',
      element: <About />
    },
    {
      path: '/TripPlaner',
      element: <ProtectedRoutes> <TripPlaner /> </ProtectedRoutes>
    }, {
      path: '/signin',
      element: <SignIn />
    }, {
      path: '/findabuddy',
      element: <ProtectedRoutes> <FindBuddy /></ProtectedRoutes>
    }
  ])
  return (
    <div>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserProvider>
    </div>
  )
}

export default App
