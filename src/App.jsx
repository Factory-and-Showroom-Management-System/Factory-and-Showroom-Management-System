import UserLogin from './components/login/UserLogin'
import './styles/App.css'


//Import react router dom
import { createBrowserRouter,
RouterProvider
 } from 'react-router-dom'

 const router = createBrowserRouter(
  [
  { path: '/', element: <div><UserLogin /></div> },
]);



function App() {

  return (

    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
