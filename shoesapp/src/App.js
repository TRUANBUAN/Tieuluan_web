import React from 'react'
import { BrowserRouter, Link, Route, } from "react-router-dom";
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import Signin from './DangNhap/Signin';
import Cart from './components/Cart';
function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Truan Buan
            </a>
          </div>
          <div>
            <Link to='/Cart'>Giỏ hàng</Link>
            <Link to='/Signin'>Đăng nhập</Link>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/Signin" component={Signin} exact></Route>
          <Route path="/Cart" component={Cart} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
