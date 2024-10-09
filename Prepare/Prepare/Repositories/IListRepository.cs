using Prepare.Models;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public interface IListRepository
    {
        // Retrieve all lists
        List<List> GetAll();

        // Retrieve a specific list by its ID
        List GetById(int id);

        // Add a new list
        void AddList(List list);

        // Update an existing list
        void UpdateList(List list);

        // Delete a list by its ID
        void DeleteList(int id);
    }
}
