import React from 'react';
import './Users.css';

const UserURL = "http://localhost:8080/users/profile";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  fetchURL() {
    fetch(UserURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.token}`
      },
    })
    .then(response => response.json())
    .then(data => {
        this.setState({user: data});
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
  }

  componentDidMount(){
    this.fetchURL();
  }

  render() 
  {
    {/* 先展示，如果有，展示，没有可以填写*/}
    const user = this.state.user;
    return (
      <div className="Users">
        User Page
          <div style={{marginBottom: '20px'}}>
              <h2>User ID: {user._id}</h2>
              <p>Email: {user.email_address}</p>
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Phone: {user.phone_number}</p>
              <img src={user.image} alt="user" />
              <p>Delivery Address:</p>
              {/* if else address*/}
              {/* <p>Street: {user.delivery_address.street}</p>
              <p>Postal Code: {user.delivery_address.postalCode}</p>
              <p>City: {user.delivery_address.city}</p>
              <p>Province: {user.delivery_address.province}</p> 
              <p>Country: {user.delivery_address.country}</p>*/}
          </div>
      </div>
    )
  }
}

export default Users;