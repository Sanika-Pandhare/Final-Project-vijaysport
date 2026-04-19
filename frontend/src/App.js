



import './App.css';
import { Outlet } from 'react-router-dom';  // ✅ only Outlet
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
  try {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();

    console.log("User API:", dataApi); // 🔥 DEBUG

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    } else {
      dispatch(setUserDetails(null)); // 🔥 IMPORTANT
    }

  } catch (err) {
    console.error("User fetch error:", err);
    dispatch(setUserDetails(null));
  }
};

 const fetchUserAddToCart = async () => {
  try {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count || 0);

  } catch (err) {
    console.error("Cart count error:", err);
    setCartProductCount(0);
  }
};

  useEffect(()=>{
    fetchUserDetails()
    fetchUserAddToCart()
  },[])

  return (
    <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
    }}>
      <ToastContainer position='top-center'/>
      
      <Header/>

      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>   {/* ✅ THIS renders all pages */}
      </main>

      <Footer/>
    </Context.Provider>
  );
}

export default App;