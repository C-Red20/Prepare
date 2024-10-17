import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '../Item/Item.jsx';
import { getListById } from '../../Managers/ListManager.jsx';
import { deleteListItem, getListItemsByListId, updateListItem } from '../../Managers/ListItemManger.jsx'; 
import { getAllItems } from '../../Managers/ItemManager.jsx'; // Add import for fetching all items
import AddItemModal from './AddItemModel.jsx';


const ListDetail = () => {
    const { id } = useParams();
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]); // State to hold all available items
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchList = async () => {
            const fetchedList = await getListById(id);
            setList(fetchedList);
            const fetchedItems = await getListItemsByListId(id);
            setItems(fetchedItems);

            const allAvailableItems = await getAllItems();
            const filteredItems = allAvailableItems.filter(item => 
                !fetchedItems.some(listItem => listItem.id === item.id)
            );
            setAllItems(filteredItems); // Set items not yet in the list
        };
        fetchList();
    }, [id]);

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

    const handleAddItem = async (item) => {
        // Make a POST request to add item to the list (listId, itemId, etc.)
        await addItemToList({ listId: id, itemId: item.id, amount: 1 });
        setItems(prevItems => [...prevItems, { ...item, amount: 1 }]);

        // Remove item from the list of addable items
        setAllItems(prevItems => prevItems.filter(i => i.id !== item.id));
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div>
            <h2>{list.name}</h2>
            <button onClick={toggleModal}>Add Item</button>

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

            {/* Scrollable box for available items */}
            <div className="available-items-box" style={{ overflowY: 'scroll', height: '200px', border: '1px solid gray' }}>
                {allItems.map(item => (
                    <div key={item.id} className="addable-item">
                        <span>{item.name}</span>
                        <button onClick={() => handleAddItem(item)}>Add</button>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <AddItemModal 
                    onClose={toggleModal} 
                    onAdd={handleAddItem} 
                    availableItems={allItems} // Pass the available items to the modal
                />
            )}
        </div>
    );
};

export default ListDetail;
