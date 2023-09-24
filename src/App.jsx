import './App.css'
import CoordinatePage from './pages/CoordinatePage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Files from './pages/Files'

const router = createBrowserRouter([
  {
    path: "/",
    element: <CoordinatePage/>
  },
  {
    path: "/downloadFile",
    element: <Files/>
  },
]);

function App() {


  return (
    <div className='bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black h-screen text-white flex justify-center items-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
