import React from 'react';

const SignupURL = "http://localhost:8080/auth/register";

const SubmitButton = (props) => {
    return <button className="submit" type="submit">{props.text}</button>
}

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

class SignUpPage extends React.Component {
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

        fetch(SignupURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email_address, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === "User registered successfully") {
                alert('Registration successful!');
                // Redirect to the login page
                window.location.replace('http://localhost:3000/login');

             
            } else {
                alert(data.message || 'Registration failed.');
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert('Registration failed. Please try again later.');
        });
    };

    render() {
        return (
            <div className="Signup">
              <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign up</h1>
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
                    <SubmitButton text="Register" />
                </form>
            </div>
        );
    }
}

export default SignUpPage;
