using System.Collections.Generic;
using Prepare.Models; 

namespace Prepare.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByEmail(string email);
        List<User> GetAll();
        User GetById(int id);
        void Update(User user); 
    }
}
