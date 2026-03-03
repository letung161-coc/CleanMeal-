import React, { useState } from 'react';
import './Hero.css';
import product5 from '../../img/product5.jpg';
import dsyeuthich from '../../img/dsyeuthich2.jpg';
import thucdon from '../../img/product4.jpg';
import { NavLink } from 'react-router-dom';
const foodData = [
  {
    id: 1,
    title: "Healthy Food",
    desc: "It's a long-established fact that readers are distracted by the readability of a page when looking at its layout.",
    image: product5
  },
  {
    id: 2,
    title: "Favorite Food",
    desc: "Traditional Italian pasta with tomato sauce, featuring a rich and flavorful taste, paired with premium Parmesan cheese.",
    image: dsyeuthich
  },
  {
    id: 3,
    title: "Private menu",
    desc: "Grilled beef steak, served with mashed potatoes and a special black pepper sauce.",
    image: thucdon
  }
];
const FoodSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === foodData.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? foodData.length - 1 : prev - 1));
  };

  const currentFood = foodData[currentIndex];

  return (
    <section className="food-hero">
        <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(https://as2.ftcdn.net/v2/jpg/03/78/19/01/1000_F_378190186_BAM7F3coo82ZHEdBogoU5hnfPwB1GOpI.jpg)` }}
      ></div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="content-col">
          <h1 className="food-title">{currentFood.title}</h1>
          <p className="food-desc">{currentFood.desc}</p>
          <NavLink to={"/recipes"}>
            <button className="order-btn">Xem Chi Tiết</button>
          </NavLink>

          <div className="nav-buttons">
            <button onClick={prevSlide} className="nav-btn">❮</button>
            <button onClick={nextSlide} className="nav-btn">❯</button>
          </div>
        </div>
        <div className="image-col">
          <div className="plate-wrapper" key={currentFood.id}>
             <img src={currentFood.image} alt={currentFood.title} className="food-img" />
          </div>
        </div>

      </div>
      <div className="cloud-effect"></div>
    </section>
  );
};

export default FoodSlider;