using Microsoft.Data.SqlClient;
using Prepare.Models;
using Prepare.Utils;

namespace Prepare.Repositories
{
    public class ListRepository : BaseRepository, IListRepository
    {
        public ListRepository(IConfiguration config) : base(config) { }

        public List<List> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, UserProfileId, Location, LastUpdated FROM List ORDER BY Name ASC";
                    var reader = cmd.ExecuteReader();
                    var lists = new List<List>();

                    while (reader.Read())
                    {
                        lists.Add(new List()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            LastUpdated = reader.IsDBNull(reader.GetOrdinal("LastUpdated"))
                                ? (DateTime?)null
                                : reader.GetDateTime(reader.GetOrdinal("LastUpdated")),
                        });
                    }

                    reader.Close();
                    return lists;
                }
            }
        }

        public List GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, UserProfileId, Location, LastUpdated FROM List WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Location = reader.GetString(reader.GetOrdinal("Location")),
                                LastUpdated = reader.IsDBNull(reader.GetOrdinal("LastUpdated"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("LastUpdated")),
                            };
                        }

                        return null;
                    }
                }
            }
        }

        public void AddList(List list)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO List (Name, UserProfileId, Location, LastUpdated) 
                        OUTPUT INSERTED.ID 
                        VALUES (@name, @userProfileId, @location, @lastUpdated)";

                    DbUtils.AddParameter(cmd, "@name", list.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", list.UserProfileId);
                    DbUtils.AddParameter(cmd, "@location", list.Location);
                    DbUtils.AddParameter(cmd, "@lastUpdated", (object)list.LastUpdated ?? DBNull.Value);

                    list.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateList(List list)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE List
                        SET 
                            Name = @name,
                            UserProfileId = @userProfileId,
                            Location = @location,
                            LastUpdated = @lastUpdated
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", list.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", list.UserProfileId);
                    DbUtils.AddParameter(cmd, "@location", list.Location);
                    DbUtils.AddParameter(cmd, "@lastUpdated", (object)list.LastUpdated ?? DBNull.Value);
                    DbUtils.AddParameter(cmd, "@id", list.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteList(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM List WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
