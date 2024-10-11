using Prepare.Models;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
    }
}
