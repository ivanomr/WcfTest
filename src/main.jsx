import React from 'react';
import ReactDOM from 'react-dom/client';
import {Login} from './screens/Autenticacion/Login.jsx';
import {TestWcf} from './screens/TestWcf/TestWcf.jsx';
import {App} from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([  
  {
    path:"/login",
    element:< Login/>,
  },
  {
    element:< App/>,
    children:[
       {
        path:'/testWcf',
        element:<TestWcf/>
       }
    ]
  },
  {
    path:'*',
    element:<h1>Ruta desconocida </h1>
   }
]);

root.render(<RouterProvider router={router} />);