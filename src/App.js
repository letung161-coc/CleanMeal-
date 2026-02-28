import logo from './logo.svg';
import './App.css';
import PhanDau from './component/Layout/PhanDau.js';
import Main from './component/Layout/Main.js';
import Footer from './component/Layout/Footer.js';
function App(props) {
  return (
    <>
      <PhanDau />
      {props.children}
      <Footer/>
    </>
  );
}

export default App;
