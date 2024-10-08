using System.Collections.Generic;
using Prepare.Models;

namespace Prepare.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);  // Updated parameter name
        UserProfile GetByEmail(string email); // Updated return type
        List<UserProfile> GetAll(); // Updated return type
        UserProfile GetById(int id); // Updated return type
        void Update(UserProfile userProfile); // Updated parameter name
    }
}
