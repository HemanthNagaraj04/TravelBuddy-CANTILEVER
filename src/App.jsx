import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import TripPlaner from './pages/TripPlaner/TripPlaner'
import { ToastContainer } from 'react-toastify'
import SignIn from './pages/SignIn/SignIn'

const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/Home',
      element:<Home />
    },
    {
      path:'/About',
      element:<About />
    },
    {
      path:'/TripPlaner',
      element:<TripPlaner />
    },{
      path:'/Sign In',
      element:<SignIn />
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
