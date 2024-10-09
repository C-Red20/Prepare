using Prepare.Models;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public interface IListItemRepository
    {
        List<ListItem> GetAll();
        ListItem GetById(int id);
        void AddListItem(ListItem listItem);
        void UpdateListItem(ListItem listItem);
        void DeleteListItem(int id);
        List<ListItem> GetByListId(int listId);
    }
}
