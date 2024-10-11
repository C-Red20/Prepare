using Prepare.Models;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public interface IItemRepository
    {
        // Retrieve all items
        List<Item> GetAll();

        // Retrieve a specific item by its ID
        Item GetById(int id);

        // Add a new item with associated user profile ID
        void AddItem(Item item, int userProfileId);

        // Update an existing item
        void UpdateItem(Item item);

        // Delete an item by its ID
        void DeleteItem(int id);

        // Retrieve items by user profile ID
        List<Item> GetByUserProfileId(int userProfileId);

        // Retrieve items by category ID
        List<Item> GetByCategoryId(int categoryId);
    }
}
