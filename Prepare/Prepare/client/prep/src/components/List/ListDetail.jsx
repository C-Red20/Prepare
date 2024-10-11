import React, { useEffect, useState } from 'react';
import { Item } from '../Item/Item.jsx';
import { getItemsByListId, getListById } from '../../Managers/ListManager.jsx';
import { deleteListItem, updateListItem } from '../../Managers/ListItemManger.jsx';

const ListDetail = ({ match }) => {
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const fetchedList = await getListById(match.params.id);
            setList(fetchedList);
            const fetchedItems = await getItemsByListId(match.params.id);
            setItems(fetchedItems);
        };
        fetchList();
    }, [match.params.id]);

    const handleAmountChange = async (itemId, newAmount) => {
        // Assuming newAmount is coming from an input field
        await updateListItem({ itemId, amount: newAmount }); // Update amount in your backend
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId ? { ...item, amount: newAmount } : item
            )
        );
    };

    const handleDeleteItem = async (itemId) => {
        await deleteListItem(itemId); // Call the function to delete item in your backend
        setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Update local state
    };

    const handleAddItem = () => {
        // Logic to open modal or navigate to add item page
    };

    return (
        <div>
            <h2>{list.name}</h2>
            <button onClick={handleAddItem} className="add-item-button">+</button>
            <div className="item-list">
                {items.map(item => (
                    <div key={item.id} className="item-container">
                        <Item item={item} />
                        <input 
                            type="number" 
                            value={item.amount} 
                            onChange={(e) => handleAmountChange(item.id, e.target.value)} 
                        />
                        <button onClick={() => handleDeleteItem(item.id)} className="delete-button">🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListDetail;
