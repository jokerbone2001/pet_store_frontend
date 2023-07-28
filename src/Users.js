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
            <div style={{ marginBottom: '20px' }}>
                <h2>User ID: {user._id}</h2>
                <h2>Email: {user.email_address}</h2> 

                {this.state.isEditing ? 
                    <div>
                        <input name="first_name" placeholder="First Name" value={user.first_name || ''} onChange={this.handleInputChange} />
                        <input name="last_name" placeholder="Last Name" value={user.last_name || ''} onChange={this.handleInputChange} />
                        <input name="phone_number" placeholder="Phone Number" value={user.phone_number || ''} onChange={this.handleInputChange} />
                        <input name="image" placeholder="Image URL" value={user.image || ''} onChange={this.handleInputChange} />
                        <h3>Delivery Address:</h3>
                        <input name="street" placeholder="Street" value={user.delivery_address?.street || ''} onChange={this.handleInputChange} />
                        <input name="postalCode" placeholder="Postal Code" value={user.delivery_address?.postalCode || ''} onChange={this.handleInputChange} />
                        <input name="city" placeholder="City" value={user.delivery_address?.city || ''} onChange={this.handleInputChange} />
                        <input name="province" placeholder="Province" value={user.delivery_address?.province || ''} onChange={this.handleInputChange} />
                        <input name="country" placeholder="Country" value={user.delivery_address?.country || ''} onChange={this.handleInputChange} />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                    : 
                    <div>
                        <p>Name: {user.first_name} {user.last_name}</p>
                        <p>Phone: {user.phone_number}</p>
                        <img src={user.image} alt="user" />
                        <h3>Delivery Address:</h3>
                        <p>Street: {user.delivery_address?.street}</p>
                        <p>Postal Code: {user.delivery_address?.postalCode}</p>
                        <p>City: {user.delivery_address?.city}</p>
                        <p>Province: {user.delivery_address?.province}</p> 
                        <p>Country: {user.delivery_address?.country}</p>
                        <button onClick={this.handleEdit}>Edit</button>

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