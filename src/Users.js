import React from 'react';
import './Users.css';
import rootURL from './url';
const UserURL = rootURL+"/users/profile";
const UpdateUserURL = rootURL+"/users/update"; 

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditing: false
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (["street", "postalCode", "city", "province", "country"].includes(name)) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                delivery_address: {
                    ...prevState.user.delivery_address,
                    [name]: value
                }
                
            }
        }));
    } else {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }
}

  handleSubmit = () => {
    fetch(UpdateUserURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.props.token}`
        },
        body: JSON.stringify(this.state.user)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        this.fetchURL(); // Fetch the updated user data again
        this.setState({ isEditing: false });
    })
    .catch(error => {
        console.error("Error:", error);
    });
  }
  handleEdit = () =>{
    this.setState({ isEditing: true });
  }
  componentDidMount(){
    this.fetchURL();
  }
  render() {
    const user = this.state.user;
    return (
        <div className="Users">
            <h1>User Page</h1>
            <div className="user-info">
                <h2>User ID: {user._id}</h2>
                <h2>Email: {user.email_address}</h2> 

                {this.state.isEditing ? 
                    <div>
                        <input name="first_name" className="input-field" placeholder="First Name" value={user.first_name || ''} onChange={this.handleInputChange} />
                        <input name="last_name" className="input-field" placeholder="Last Name" value={user.last_name || ''} onChange={this.handleInputChange} />
                        <input name="phone_number" className="input-field" placeholder="Phone Number" value={user.phone_number || ''} onChange={this.handleInputChange} />
                        <input name="image" className="input-field" placeholder="Image URL" value={user.image || ''} onChange={this.handleInputChange} />
                        <h3>Delivery Address:</h3>
                        <input name="street" className="input-field" placeholder="Street" value={user.delivery_address?.street || ''} onChange={this.handleInputChange} />
                        <input name="postalCode" className="input-field" placeholder="Postal Code" value={user.delivery_address?.postalCode || ''} onChange={this.handleInputChange} />
                        <input name="city" className="input-field" placeholder="City" value={user.delivery_address?.city || ''} onChange={this.handleInputChange} />
                        <input name="province" className="input-field" placeholder="Province" value={user.delivery_address?.province || ''} onChange={this.handleInputChange} />
                        <input name="country" className="input-field" placeholder="Country" value={user.delivery_address?.country || ''} onChange={this.handleInputChange} />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                    : 
                    <div>
                      {/* 用户信息展示 */}
                      <div className="user-details">
                        <div className="user-detail">
                          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                          <p><strong>Phone:</strong> {user.phone_number}</p>
                        </div>
                        <div className="user-detail">
                          <img src={user.image} alt="user" className="user-image" />
                        </div>
                      </div>
                      <div className="delivery-address">
                        <h3>Delivery Address:</h3>
                        <p><strong>Street:</strong> {user.delivery_address?.street}</p>
                        <p><strong>Postal Code:</strong> {user.delivery_address?.postalCode}</p>
                        <p><strong>City:</strong> {user.delivery_address?.city}</p>
                        <p><strong>Province:</strong> {user.delivery_address?.province}</p>
                        <p><strong>Country:</strong> {user.delivery_address?.country}</p>
                      </div>
                      <button onClick={this.handleEdit} className="edit-button">
                        Edit
                      </button>
                    </div>
                }
            </div>
        </div>
    )
}
}

export default Users;

{/*Product 页面用户可以下单，下完单后存入order里面 
order 需要一个user order route，可以查看order 的状态*/}