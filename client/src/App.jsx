import "./app.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//import React from "react";
import Navbar from "./components/navbar/Navbar";
/*import Footer from "./components/footer/footer";*/
import SignUp from "./pages/signUp/signUp";
import SignIn from "./pages/signIn/signIn";
import Home from "./pages/home/home";


function App() {
  const Layout = () => {
    return (
      <ChakraProvider>
      <div className="app">
        <Navbar/>
        <Outlet />
       
      </div>
      </ChakraProvider>) ;
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
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/profile",
         // element: <Profile />,
        },
      ],
    }
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;