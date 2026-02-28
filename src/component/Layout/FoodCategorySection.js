import React from 'react';
import { FaFire } from 'react-icons/fa';
import './Menu.css';
const FoodCategorySection = ({ title, items }) => {
    return (
        <>
            <section className="soup-section">
                <div className='menu-container'>
                    <h2 className="section-title">{title}</h2>

                    <div className="food-grid">
                        {items.map((item) => (
                            <div key={item.id} className="food-card">
                                <div className="card-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="card-body">
                                    <div className="tags">
                                        {item.tags.map((tag, index) => (
                                            <span key={index} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="foodcs-title">{item.name}</h3>

                                    <div className="macros">
                                        <div className="macro-item highlight">
                                            <span className="label">Cal</span>
                                            <span className="value">{item.macros.cal}</span>
                                        </div>
                                        <div className="macro-item">
                                            <span className="label">Carbs</span>
                                            <span className="value">{item.macros.carbs}</span>
                                        </div>
                                        <div className="macro-item">
                                            <span className="label">Fats</span>
                                            <span className="value">{item.macros.fats}</span>
                                        </div>
                                        <div className="macro-item">
                                            <span className="label">Protein</span>
                                            <span className="value">{item.macros.protein}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="view-all-container">
                        <button className="btn-view-all">View All →</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FoodCategorySection;