import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home/Home'
import About from './pages/About/About'

const App = () => {
  const router=createBrowserRouter([
    {path:'/',
      element:<Home />
    },
    {path:'/Home',
      element:<Home />
    },
    {path:'/About',
      element:<About />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
