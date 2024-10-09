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
                    cmd.CommandText = "SELECT Id, Name, UserProfileId, Location, Checked FROM List ORDER BY Name ASC";
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
                            Checked = reader.IsDBNull(reader.GetOrdinal("Checked")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("Checked")),
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
                    cmd.CommandText = "SELECT Id, Name, UserProfileId, Location, Checked FROM List WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        List list = new List
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Location = reader.GetString(reader.GetOrdinal("Location")),
                            Checked = reader.IsDBNull(reader.GetOrdinal("Checked")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("Checked")),
                        };

                        reader.Close();
                        return list;
                    }

                    reader.Close();
                    return null;
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
                    cmd.CommandText = @"INSERT INTO List (Name, UserProfileId, Location, Checked) 
                                        OUTPUT INSERTED.ID 
                                        VALUES (@name, @userProfileId, @location, @checked)";

                    DbUtils.AddParameter(cmd, "@name", list.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", list.UserProfileId);
                    DbUtils.AddParameter(cmd, "@location", list.Location);
                    DbUtils.AddParameter(cmd, "@checked", (object)list.Checked ?? DBNull.Value);

                    int id = (int)cmd.ExecuteScalar();
                    list.Id = id;
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
                            Checked = @checked
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", list.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", list.UserProfileId);
                    DbUtils.AddParameter(cmd, "@location", list.Location);
                    DbUtils.AddParameter(cmd, "@checked", (object)list.Checked ?? DBNull.Value);
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
                    cmd.CommandText = @"DELETE FROM List WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
