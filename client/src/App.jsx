import Footer from './components/footer/footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'

function App() {
  const Layout = () => {
    return (
      <div className="app">
        
        <Footer /> 
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
     
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App
