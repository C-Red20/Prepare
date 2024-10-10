import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager.jsx";

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    
    const userProfile = { Name: name, email };
    register(userProfile)
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
      });
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
