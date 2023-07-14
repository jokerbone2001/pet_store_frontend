import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Orders from './Orders';
import Users from './Users';
import Products from './Products';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App(){
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
          </ul>
        </nav>
        <Routes>
          <Route path='/order' element={<Orders></Orders>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/product' element={<Products/>}/>
        </Routes>
      </div>
    </Router>
  )
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
