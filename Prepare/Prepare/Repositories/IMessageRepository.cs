using Prepare.Models;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public interface IMessageRepository
    {
        List<Message> GetAll();
        Message GetById(int id);
        void AddMessage(Message message);
        void UpdateMessage(Message message);
        void DeleteMessage(int id);
        List<Message> GetByUserProfileId(int userProfileId);
    }
}
