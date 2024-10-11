using Prepare.Models;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetById(int id);
        void UpdateCategory(Category category);
        void AddCategory(Category category);
        void DeleteCategory(int id);
    }
}
