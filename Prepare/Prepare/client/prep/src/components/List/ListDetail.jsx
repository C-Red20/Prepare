import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '../Item/Item.jsx';
import { getListById } from '../../Managers/ListManager.jsx';
import { addItemToList, deleteListItem, getListItemsByListId, updateListItem } from '../../Managers/ListItemManger.jsx'; 
import { getAllItems } from '../../Managers/ItemManager.jsx'; // Add import for fetching all items


const ListDetail = () => {
    const { id } = useParams();
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);
    const [itemzzz, setItemzzz] = useState([]);
    const [allItems, setAllItems] = useState([]); // State to hold all available items
    const [modalOpen, setModalOpen] = useState(false);

    const fetchList =  () => {
        // const fetchedList =  getListById(id);
        // setList(fetchedList);
        // let fetchedItems =  getListItemsByListId(id);
        //  setItems(fetchedItems);
        
        // const allAvailableItems =  getAllItems();
        // const filteredItems = allAvailableItems.filter(item => 
        //     !fetchedItems.some(listItem => listItem.id === item.id)
        // );
        // setAllItems(filteredItems); // Set items not yet in the list
        getListById(id).then(setList)
        .then(() => getListItemsByListId(id)).then(setItems)
        .then(() => getAllItems()).then((allitems) => {
           const  filteredItems = allitems.filter(item => 
                 !items.some(listItem => listItem.id === item.id)
             )
            setAllItems(filteredItems)
           
        })
    };
    useEffect(() => {
        fetchList();
    }, [id]);


    useEffect(()=>{
            let fetchedItems = items.map((em) =>{

                 const ob = allItems.find(x => x.id == em.itemId )

                 return ob
            })
            setItemzzz(fetchedItems);
        
    },[allItems])

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
        await addItemToList(item);
    setItems(prevItems => [...prevItems, { ...item, amount: 1 }]);
    setAllItems(prevItems => prevItems.filter(i => i.id !== item.id));
};
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return ( 
        <div>
            <h2>{list.name}</h2>
            <h4>Location: {list.location}</h4>
            <div>Last Updated: {list.lastUpdated ? new Date(list.lastUpdated).toLocaleDateString('en-GB').split('/').join('-') : 'N/A'}</div>

            <div className="item-list">
                {itemzzz.map(item => ( 
                    <div key={item.id} className="item-container">
                        <Item item={item} />
                        {/* <div>Amount:</div>
                        <input 
                            type="number" 
                            value={item.amount} 
                            onChange={(e) => handleAmountChange(item.id, e.target.value)} 
                        /> */}
                        {/* <button onClick={() => handleDeleteItem(item.id)}>🗑️</button> */}
                    </div>
                ))}
            </div>

            {/* Scrollable box for available items */}
            <div className="available-items-box" style={{ overflowY: 'scroll', height: '200px', border: '1px solid gray' }}>
                {allItems.map(item => (
                    <div key={item.id} className="addable-item">
                        <span>{item.name}</span>
                        <button onClick={() => {
                            const bridgeObject = {
                                "itemId": item.id,
                                "listId": id,
                                "amount": 10,
                                "itemName": null,
                                "list": null
                              }
                            handleAddItem(bridgeObject)}}>Add</button>
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
