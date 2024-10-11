import React, { useState } from 'react';

const AddItemModal = ({ onClose, onAdd }) => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = () => {
        onAdd(itemName);
        onClose();
    };

    return (
        <div className="modal">
            <h3>Add New Item</h3>
            <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                placeholder="Item Name" 
            />
            <button onClick={handleSubmit}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddItemModal;
