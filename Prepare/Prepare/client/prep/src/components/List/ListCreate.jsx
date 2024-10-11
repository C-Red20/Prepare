import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addList } from "../../Managers/ListManager.jsx";
import { Button, Form, Input } from "reactstrap";

export const ListCreate = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addList({ name }).then(() => {
            navigate("/lists");
        });
    };

    return (
        <div>
            <h1>Create New List</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="List Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button color="info" type="submit">Create List</Button>
            </Form>
        </div>
    );
};
