import React, { useEffect, useState } from 'react';
import { Item } from '../Item/Item.jsx';
import { getItemsByListId, getListById } from '../../Managers/ListManager.jsx';
import { deleteListItem, updateListItem } from '../../Managers/ListItemManger.jsx'; 


const ListDetail = ({ match }) => {
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

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
        await updateListItem({ itemId, amount: newAmount });
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, amount: newAmount } : item
            )
        );
    };

    const handleDeleteItem = async (itemId) => {
        await deleteListItem(itemId);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen); // Toggle modal visibility
    };

    // const handleAddItem = async (itemName) => {
    //     // Call your backend function to add the new item
    //     const addedItem = await addItemToList(list.id, { name: itemName, amount: 1 }); // Default amount is 1
    //     setItems([...items, addedItem]); // Update local state with new item
    // };

    return (
        <div>
            <h2>{list.name}</h2>
            <button onClick={toggleModal}>Add Item</button> {/* Button to open the modal */}
            
            <div className="item-list">
                {items.map(item => (
                    <div key={item.id} className="item-container">
                        <Item item={item} />
                        <input 
                            type="number" 
                            value={item.amount} 
                            onChange={(e) => handleAmountChange(item.id, e.target.value)} 
                        />
                        <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
                    </div>
                ))}
            </div>

            {/* Modal component for adding a new item */}
            {modalOpen && (
                <AddItemModa 
                    onClose={toggleModal} 
                    onAdd={handleAddItem} // Pass the handleAddItem function
                />
            )}
        </div>
    );
};

export default ListDetail;
