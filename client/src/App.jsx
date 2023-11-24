import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
//import React from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import SignUp from "./pages/signUp/signUp";
import SignIn from "./pages/signIn/signIn";
import Profile from "./pages/profile/profile";
import Rapport from "./pages/rapport/rapport";
import Subscribe from "./pages/Subscribe/Subscribe";
<<<<<<< HEAD
=======
import Home from "./pages/home/home";
>>>>>>> fe4db40b8a12aa075910be8b0f3a9a77710e873c
import Admin from "./pages/Admin/Admin";
import AddBadgeForm from "./pages/AddBadgeForm/AddBadgeForm";


function App() {
  const Layout = () => {
    return (
      //<div className="app">
        <ChakraProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </ChakraProvider>
      //</div>
  ) ;
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
          element: <Profile />,
        },
        {
          path: "/rapport",
          element: <Rapport />,
        },
        {
          path: "/abonnement",
          element: <Subscribe />,
        },{
          path: "/admin",
          element: <Admin />,
<<<<<<< HEAD
        },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/admin", // Default route for /admin
          element: <Admin />,
        },
        {
=======
        },{
>>>>>>> fe4db40b8a12aa075910be8b0f3a9a77710e873c
          path: "/addbadge",
          element: <AddBadgeForm />,
        },
      ],
<<<<<<< HEAD
    },
=======
    }
>>>>>>> fe4db40b8a12aa075910be8b0f3a9a77710e873c
  ]);

  return <RouterProvider router={router} />;
}

export default App;

