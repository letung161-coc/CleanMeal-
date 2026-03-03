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
import About from './component/Layout/page/About';
import Services from './component/Layout/page/Services';
import Login from './component/Layout/page/login';
import Register from './component/Layout/page/register';
import Product from './component/Layout/Product';
import AllProduct from './component/Layout/page/AllProduct';
import AllRecipes from './component/Layout/page/AllRecipes';
import WeeklyPlan from './component/Layout/page/WeeklyPlan';
import Favorites from './component/Layout/page/Favorites';
import Videos from './component/Layout/page/Videos';
import Blog from './component/Layout/page/Blog';
import CookBook from './component/Layout/page/CookBook';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/allproduct' element={<AllProduct />}/>
            <Route path='/recipes' element={<AllRecipes />}/>
            <Route path='/weeklyplan' element={<WeeklyPlan />}/>
            <Route path='/favorites' element={<Favorites />}/>
            <Route path='/videos' element={<Videos />}/>
            <Route path='/blog' element={<Blog />}/>
            <Route path='/cookbook' element={<CookBook />}/>
          </Routes>
        </App>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
