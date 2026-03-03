import { useEffect } from 'react';
import './App.css';
import AppHeader from './component/Layout/AppHeader.js';
import Footer from './component/Layout/Footer.js';

// AOS – Animate on Scroll Library
import AOS from 'aos';
import 'aos/dist/aos.css';

function App(props) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className="app-container">
      <AppHeader />
      <main className="main-content">
        {props.children}
      </main>
      <Footer/>
    </div>
  );
}

export default App;
