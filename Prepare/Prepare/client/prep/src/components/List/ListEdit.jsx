import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getListById, updateList } from "../../Managers/ListManager.jsx"; // Adjust the import path

export const ListEdit = () => {
    const { id } = useParams(); // Get the list ID from URL parameters
    const navigate = useNavigate();

    // State variables for list details
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const fetchList = async () => {
            try {
                const list = await getListById(id);
                // Set the state variables to the fetched list data
                if (list) {
                    setName(list.name);
                    setLocation(list.location);
                    setLastUpdated(list.lastUpdated); // Adjust based on your date format
                }
            } catch (error) {
                console.error("Error fetching list:", error);
                // Handle error (e.g., show a notification)
            }
        };

        fetchList();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedList = {
            id: parseInt(id),
            name,
            location,
            lastUpdated, // Send the updated last updated date
        };

        try {
            await updateList(updatedList);
            navigate("/lists"); // Redirect after successful update
        } catch (error) {
            console.error("Error updating list:", error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div>
            <h2>Edit List</h2>
            <Form onSubmit={handleSave}>
                <Input
                    type="text"
                    placeholder="List Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required // Ensure this field is filled
                />
                <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required // Ensure this field is filled
                />
                <Input
                    type="date"
                    value={lastUpdated}
                    onChange={(e) => setLastUpdated(e.target.value)}
                />
                <Button color="info" type="submit">Save</Button>
            </Form>
        </div>
    );
};
