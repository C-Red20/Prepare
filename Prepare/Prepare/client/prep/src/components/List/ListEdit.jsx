import React, { useState } from "react";
import { updateListDate } from "../../Managers/ListManager.jsx";
import { Button, Input } from "reactstrap";

export const ListEdit = ({ list }) => {
    const [lastUpdated, setLastUpdated] = useState(list.Checked || '');

    const handleSave = () => {
        updateListDate(list.id, lastUpdated).then(() => {
            // Handle successful update (e.g., redirect, show a success message)
        }).catch((error) => {
            console.error("Error updating list:", error);
        });
    };

    return (
        <div>
            <h2>Edit List</h2>
            <Input
                type="date"
                value={lastUpdated}
                onChange={(e) => setLastUpdated(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};
