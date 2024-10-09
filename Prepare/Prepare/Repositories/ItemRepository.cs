using Microsoft.Data.SqlClient;
using Prepare.Models;
using Prepare.Utils;

namespace Prepare.Repositories
{
    public class ItemRepository : BaseRepository, IItemRepository
    {
        public ItemRepository(IConfiguration config) : base(config) { }

        public List<Item> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.Name, i.UserProfileId, i.CategoryId, i.Have, 
                               c.Name AS CategoryName, u.Name AS UserProfileName
                        FROM Item i
                        LEFT JOIN Category c ON i.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON i.UserProfileId = u.Id
                        ORDER BY i.Name ASC";

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Have = reader.GetBoolean(reader.GetOrdinal("Have")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName")),
                            },
                            UserProfile = new UserProfile
                            {
                                // Assuming UserProfile has properties like Id and Name
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                            }
                        });
                    }

                    reader.Close();
                    return items;
                }
            }
        }

        public Item GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.Name, i.UserProfileId, i.CategoryId, i.Have, 
                               c.Name AS CategoryName, u.Name AS UserProfileName
                        FROM Item i
                        LEFT JOIN Category c ON i.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON i.UserProfileId = u.Id
                        WHERE i.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Item item = new Item
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            Have = reader.GetBoolean(reader.GetOrdinal("Have")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName")),
                            },
                            UserProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                            }
                        };

                        reader.Close();
                        return item;
                    }

                    reader.Close();
                    return null;
                }
            }
        }

        public void AddItem(Item item)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Item (Name, UserProfileId, CategoryId, Have) 
                                        OUTPUT INSERTED.ID 
                                        VALUES (@name, @userProfileId, @categoryId, @have)";

                    DbUtils.AddParameter(cmd, "@name", item.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", item.UserProfileId);
                    DbUtils.AddParameter(cmd, "@categoryId", item.CategoryId);
                    DbUtils.AddParameter(cmd, "@have", item.Have);

                    int id = (int)cmd.ExecuteScalar();
                    item.Id = id;
                }
            }
        }

        public void UpdateItem(Item item)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Item
                        SET 
                            Name = @name,
                            UserProfileId = @userProfileId,
                            CategoryId = @categoryId,
                            Have = @have
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", item.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", item.UserProfileId);
                    DbUtils.AddParameter(cmd, "@categoryId", item.CategoryId);
                    DbUtils.AddParameter(cmd, "@have", item.Have);
                    DbUtils.AddParameter(cmd, "@id", item.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteItem(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Item WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Item> GetByUserProfileId(int userProfileId)
        {
            throw new NotImplementedException();
        }

        public List<Item> GetByCategoryId(int categoryId)
        {
            throw new NotImplementedException();
        }
    }
}
