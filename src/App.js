
import './App.css';
import './index.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProudctDetails/ProudctDetails';
import NotFound from './Components/NotFound/NotFound';
import Brands from './Components/Brands/Brands'
import Wishlist from './Components/Wishlist/Wishlist'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import CounterContextProvider from './Context/CounterContext';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import Allorders from './Components/Allorders/Allorders';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'





function App() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser()
    }
  }, [])

  function saveUser() {
    let encodedToken = localStorage.getItem("userToken")
    let decoded = jwtDecode(encodedToken)

    console.log(decoded);
    setUserData(decoded)
  }


  const routes = createHashRouter([
    {
      path: "", element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true, element: <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        },
        {
          path: "home", element: <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        },
        { path: "login", element: <Login saveUser={saveUser} /> },
        { path: "register", element: <Register /> },
        {
          path: "forgotPassword", element: 
            <ForgotPassword/>
        },
        {
          path: "cart", element: <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        },
        {
          path: "products", element: <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        },
        {
          path: "checkout", element: <ProtectedRoutes>
            <Checkout/>
          </ProtectedRoutes>
        },
        {
          path: "allorders", element: <ProtectedRoutes>
            <Allorders/>
          </ProtectedRoutes>
        },
        {
          path: "brands", element: <ProtectedRoutes>
            <Brands/>
          </ProtectedRoutes>
        },
        {
          path: "forgotPassword", element: <ProtectedRoutes>
            <ForgotPassword/>
          </ProtectedRoutes>
        },
        {
          path: "wishlist", element: <ProtectedRoutes>
            <Wishlist/>
          </ProtectedRoutes>
        },
        {
          path: "product-details/:id", element: <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        },
        { path: "*", element: <NotFound /> }

      ]
    }
  ])


  return (
   <CartContextProvider>
     <CounterContextProvider>
      <Toaster></Toaster>
      <RouterProvider router={routes}></RouterProvider>
    </CounterContextProvider>
   </CartContextProvider>
   );
}






export default App;
