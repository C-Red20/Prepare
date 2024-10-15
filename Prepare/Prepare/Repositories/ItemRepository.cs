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
                        items.Add(new Item
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
                        WHERE i.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Item
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
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                                }
                            };
                        }
                    }

                    return null;
                }
            }
        }

        public void AddItem(Item item, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                // Check if CategoryId exists
                using (var checkCategoryCmd = conn.CreateCommand())
                {
                    checkCategoryCmd.CommandText = "SELECT COUNT(*) FROM Category WHERE Id = @categoryId";
                    DbUtils.AddParameter(checkCategoryCmd, "@categoryId", item.CategoryId);
                    int categoryCount = (int)checkCategoryCmd.ExecuteScalar();
                    if (categoryCount == 0) throw new Exception("Category does not exist.");
                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Item (Name, UserProfileId, CategoryId, Have) 
                                        OUTPUT INSERTED.ID 
                                        VALUES (@name, @userProfileId, @categoryId, @have)";

                    DbUtils.AddParameter(cmd, "@name", item.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    DbUtils.AddParameter(cmd, "@categoryId", item.CategoryId);
                    DbUtils.AddParameter(cmd, "@have", item.Have);

                    item.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateItem(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Item
                        SET 
                            Name = @name,
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
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Item WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Item> GetByUserProfileId(int userProfileId)
        {
            // Implementation needed
            throw new NotImplementedException();
        }

        public List<Item> GetByCategoryId(int categoryId)
        {
            // Implementation needed
            throw new NotImplementedException();
        }
    }
}
