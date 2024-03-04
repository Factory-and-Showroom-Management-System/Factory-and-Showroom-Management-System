// import AdminDashboard from './components/Dashboards/AdminDashboard'
import UserLogin from './components/login/UserLogin'
// import UserRegister from './components/Register/UserRegister'
import './styles/App.css'




//Import react router dom
import { createBrowserRouter,
RouterProvider
 } from 'react-router-dom'

 const router = createBrowserRouter(
  [
  { path: '/', element: <div><UserLogin /></div> },
  // { path: '/register', element: <div><UserRegister /></div> },
  // { path: '/dashboards', element: <div><AdminDashboard /></div> },
]);



function App() {

  return (

    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
