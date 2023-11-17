import React from 'react';

import { useNavigate } from 'react-router-dom';
import rootURL from './url';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthPage.css'; // Reuse the same CSS file for consistent styling

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
            <div className="auth-page">
                <div className="auth-container">
                    <h1 className="auth-title">Login In</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="input-field"
                            name="email_address"
                            type="email"
                            placeholder="Enter your email"
                            value={this.state.email_address}
                            onChange={this.handleInputChange}
                        />
                        <input
                            className="input-field"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                        <button className="submit" type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;

