using Microsoft.Data.SqlClient;
using Prepare.Models;
using Prepare.Utils;

namespace Prepare.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration config) : base(config) { }

        public List<Message> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Content, UserProfileId, PostedDate FROM Message ORDER BY PostedDate DESC"; // Change here
                    var reader = cmd.ExecuteReader();
                    var messages = new List<Message>();

                    while (reader.Read())
                    {
                        messages.Add(new Message
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Content = reader.GetString(reader.GetOrdinal("Content")), // Change here
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PostedDate = reader.GetDateTime(reader.GetOrdinal("PostedDate")),
                        });
                    }

                    reader.Close();
                    return messages;
                }
            }
        }

        public Message GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Content, UserProfileId, PostedDate FROM Message WHERE Id = @id"; // Change here
                    DbUtils.AddParameter(cmd, "@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return new Message
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Content = reader.GetString(reader.GetOrdinal("Content")), // Change here
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PostedDate = reader.GetDateTime(reader.GetOrdinal("PostedDate")),
                        };
                    }

                    reader.Close();
                    return null;
                }
            }
        }

        public void AddMessage(Message message)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Message (Content, UserProfileId, PostedDate) 
                                        OUTPUT INSERTED.ID 
                                        VALUES (@content, @userProfileId, @postedDate)"; // Change here

                    DbUtils.AddParameter(cmd, "@content", message.Content); // Change here
                    DbUtils.AddParameter(cmd, "@userProfileId", message.UserProfileId);
                    DbUtils.AddParameter(cmd, "@postedDate", message.PostedDate);

                    int id = (int)cmd.ExecuteScalar();
                    message.Id = id;
                }
            }
        }

        public void UpdateMessage(Message message)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Message
                        SET 
                            Content = @content, // Change here
                            UserProfileId = @userProfileId,
                            PostedDate = @postedDate
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@content", message.Content); // Change here
                    DbUtils.AddParameter(cmd, "@userProfileId", message.UserProfileId);
                    DbUtils.AddParameter(cmd, "@postedDate", message.PostedDate);
                    DbUtils.AddParameter(cmd, "@id", message.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteMessage(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Message WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Message> GetByUserProfileId(int userProfileId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Content, UserProfileId, PostedDate FROM Message WHERE UserProfileId = @userProfileId"; // Change here
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();
                    var messages = new List<Message>();

                    while (reader.Read())
                    {
                        messages.Add(new Message
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Content = reader.GetString(reader.GetOrdinal("Content")), // Change here
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PostedDate = reader.GetDateTime(reader.GetOrdinal("PostedDate")),
                        });
                    }

                    reader.Close();
                    return messages;
                }
            }
        }
    }
}
