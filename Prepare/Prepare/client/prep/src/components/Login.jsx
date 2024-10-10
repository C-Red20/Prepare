import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager.jsx";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email })
      .then(r => {
        if (r) {
          setIsLoggedIn(true);
          navigate('/');  // Redirect to home or another page after successful login
        } else {
          alert("Invalid email");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Login failed, please try again.");
      });
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}
