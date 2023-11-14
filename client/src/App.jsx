import "./app.scss";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";


function App() {
  const Layout = () => {
    return (
      <div className="app">
        
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        
        
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;