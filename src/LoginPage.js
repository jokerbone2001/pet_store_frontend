import React from 'react';

import { useNavigate } from 'react-router-dom';
import rootURL from './url';

const LoginPageURL = rootURL+"/auth/login";

const UserInput = (props) => (
    <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        style={{ backgroundColor: 'white' }}
        name={props.name}
    />
);

const SubmitButton = (props) => {
    return <button className="submit" type="submit">{props.text}</button>
}
const LoginPage = (props) =>
{
    const navigate = useNavigate();
    
    return  <Login 
    handleAuth={props.handleAuth}
    loginStatus = {props.loginStatus}
    navigate={navigate} />;
};

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email_address: "",
            password: "",
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { email_address, password } = this.state;

        fetch(LoginPageURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email_address, password })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data.message);
            console.log(data.user_id);
            if (data.message === "Logged in successfully") {
                alert('Logged in successfully');
                data.status = true;
                this.props.handleAuth(data);
                
                this.props.navigate('/users');  

            } else {
                data.status = false;
                this.props.handleAuth(data);
                alert(data.message || 'Invalid username or password');
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert('Login failed. Please try again later.');
        });
    };

    render() {
        return (
            <div className="Login">
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Login Page</h1>
               
                <form onSubmit={this.handleSubmit}>
                    <UserInput 
                        name="email_address" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={this.state.email_address} 
                        handleChange={this.handleInputChange}
                    />
                    <UserInput 
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={this.state.password} 
                        handleChange={this.handleInputChange}
                    />
                    <SubmitButton text="Login" />
                </form>
            </div>
        );
    }
}

export default LoginPage;

