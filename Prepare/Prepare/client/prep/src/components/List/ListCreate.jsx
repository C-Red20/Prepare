import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addList } from "../../Managers/ListManager.jsx";
import { Button, Form, Input } from "reactstrap";

export const ListCreate = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation checks
        if (name.trim() === "") {
            alert("List name cannot be empty");
            return;
        }
        if (location.trim() === "") {
            alert("Location cannot be empty");
            return;
        }

        // Get userProfileId from localStorage
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        const userProfileId = userProfile ? userProfile.id : null;

        // Check if userProfileId is available
        if (!userProfileId) {
            alert("User profile not found. Please log in.");
            return;
        }

        // Add list with name, location, and userProfileId
        addList({ name, location, userProfileId }).then(() => {
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
                <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <Button color="info" type="submit">Create List</Button>
            </Form>
        </div>
    );
};
