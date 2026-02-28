import './AboutFood.css';
import banner3 from '../../img/banner3.jpg';
import foodImg from '../../img/banner2.jpg';
function AboutFood() {
    return (
        <>
        <section className="about">
            <div className="about-container">
                
                <div className="about-left">
                    <img src={banner3} alt="Favorite Food" />
                </div>

                <div className="about-right">
                    <h2>Thêm các món ăn yêu thích của bạn</h2>

                    <p className="about-desc">
                        Chúng tôi có rất nhiều món ăn nổi tiếng trên thế giới và
                        kèm theo đó là cách nấu và chi tiết về những thông số của
                        món ăn như: protein, calo, carb, fat...
                    </p>

                    <h3>About us</h3>

                    <p className="about-text">
                        Bạn có thể làm gì đó bla bla......................
                        ....................................................
                        ....................................................
                    </p>

                    <button className="about-btn">More</button>
                </div>

            </div>
        </section>
        <section className="intro">
            <div className="intro-overlay">
                <div className="intro-content">
                    <h2>
                        Get Clean and Fresh <br />
                        Green <span>Organic Food</span>
                    </h2>

                    <p>
                       Ở đây có ......................................................................................
                    </p>

                    <button className="intro-btn">More</button>
                </div>

                <div className="intro-image">
                    <img src={foodImg} alt="Organic Food" />
                </div>
            </div>
        </section>
        </>
    );
}

export default AboutFood;
