import React, { useState } from 'react';

const AddItemModal = ({ onClose, onAdd, availableItems }) => {
    const [selectedItemId, setSelectedItemId] = useState('');

    const handleSubmit = () => {
        const selectedItem = availableItems.find(item => item.id === parseInt(selectedItemId));
        if (selectedItem) {
            onAdd(selectedItem); // Pass the full item object to the onAdd function
        }
        onClose();
    };

    return (
        <div className="modal">
            <h3>Add New Item</h3>
            
            {/* Dropdown to select an item from availableItems */}
            <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)}>
                <option value="">Select an Item</option>
                {availableItems.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit} disabled={!selectedItemId}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddItemModal;
