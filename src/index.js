import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Orders from './Orders';
import Users from './Users';
import Products from './Products';
import ProductDetail from './ProductDetail';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      loginStatus : false,
      token : "",
      user_id:""
    };
  }
  handleAuth = (userData) => {
    console.log(userData);
    this.setState({
      loginStatus : userData.status,
      token:userData.token,
      user_id: userData.user_id
    });
  };


  render() {
    return (
      <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <Link className="navbar-brand" to="/">
                      <img src="/logo.png" alt="Brand Logo" className="logo-image" />
                      </Link>                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link large-bold-text" to='/order'>Order</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link large-bold-text" to='/users'>User</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link large-bold-text" to='/product'>Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link large-bold-text" to='/signup'>Sign up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link large-bold-text" to='/login'>Log in</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
          <Routes>
            <Route path='/order' element={<Orders></Orders>}/>
            <Route path='/users' element={<Users
              handleAuth={this.handleAuth}
              loginStatus = {this.state.loginStatus}
              token = {this.state.token}/>}/>
            <Route path='/product' element={<Products 
              handleAuth={this.handleAuth}
              loginStatus = {this.state.loginStatus}
              token = {this.state.token}
              user_id = {this.state.user_id}/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/login' element={<LoginPage 
              handleAuth={this.handleAuth}
              loginStatus = {this.state.loginStatus}/>}/>
            <Route path='/signup' element={<SignUpPage/>}/> 
          </Routes>
        </div>
      </Router>
      
  )}

}

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
