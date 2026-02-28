import React from 'react';
import ReactDOM from 'react-dom/client';
import{
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './component/Layout/page/Home';
import Contact from './component/Layout/page/Contact';
import About from './component/Layout/page/Abou';
import Login from './component/Layout/page/login';
import Register from './component/Layout/page/register';
import Product from './component/Layout/Product';
import AllProduct from './component/Layout/page/AllProduct';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/allproduct' element={<AllProduct />}/>
          </Routes>
        </App>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
