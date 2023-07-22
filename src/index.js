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
      token : ""
    };
  }
  handleAuth = (userData) => {
    console.log(userData);
    this.setState({
      loginStatus : userData.status,
      token:userData.token
    });
};

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/order'>Order</Link>
              </li>
              <li>
                <Link to='/users'>User</Link>
              </li>
              <li>
                <Link to='/product'>Product</Link>
              </li>
              <li>
                <Link to='/signup'>Sign up</Link>
              </li>
              <li>
                <Link to='/login'>Log in</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/order' element={<Orders></Orders>}/>
            <Route path='/users' element={<Users
              handleAuth={this.handleUsers}
              loginStatus = {this.state.loginStatus}
              token = {this.state.token}/>}/>
            <Route path='/product' element={<Products/>}/>
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
