using Microsoft.Data.SqlClient;
using Prepare.Models;
using Prepare.Utils;
using System.Collections.Generic;

namespace Prepare.Repositories
{
    public class ListItemRepository : BaseRepository, IListItemRepository
    {
        public ListItemRepository(IConfiguration config) : base(config) { }

        public List<ListItem> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, ItemId, ListId, Amount FROM ListItem ORDER BY Id ASC";
                    var reader = cmd.ExecuteReader();
                    var listItems = new List<ListItem>();

                    while (reader.Read())
                    {
                        listItems.Add(new ListItem
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            ItemId = reader.GetInt32(reader.GetOrdinal("ItemId")),
                            ListId = reader.GetInt32(reader.GetOrdinal("ListId")),
                            Amount = reader.GetInt32(reader.GetOrdinal("Amount")),
                        });
                    }

                    reader.Close();
                    return listItems;
                }
            }
        }

        public ListItem GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, ItemId, ListId, Amount FROM ListItem WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new ListItem
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                ItemId = reader.GetInt32(reader.GetOrdinal("ItemId")),
                                ListId = reader.GetInt32(reader.GetOrdinal("ListId")),
                                Amount = reader.GetInt32(reader.GetOrdinal("Amount")),
                            };
                        }

                        return null;
                    }
                }
            }
        }

        public void AddListItem(ListItem listItem)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ListItem (ItemId, ListId, Amount) 
                        OUTPUT INSERTED.ID 
                        VALUES (@itemId, @listId, @amount)";

                    DbUtils.AddParameter(cmd, "@itemId", listItem.ItemId);
                    DbUtils.AddParameter(cmd, "@listId", listItem.ListId);
                    DbUtils.AddParameter(cmd, "@amount", listItem.Amount);

                    listItem.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateListItem(ListItem listItem)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ListItem
                        SET 
                            ItemId = @itemId,
                            ListId = @listId,
                            Amount = @amount
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@itemId", listItem.ItemId);
                    DbUtils.AddParameter(cmd, "@listId", listItem.ListId);
                    DbUtils.AddParameter(cmd, "@amount", listItem.Amount);
                    DbUtils.AddParameter(cmd, "@id", listItem.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteListItem(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM ListItem WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<ListItem> GetByListId(int listId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT li.Id, li.ItemId, li.ListId, li.Amount, i.Name AS ItemName
                        FROM ListItem li
                        JOIN Item i ON li.ItemId = i.Id
                        WHERE li.ListId = @listId";
                    DbUtils.AddParameter(cmd, "@listId", listId);
                    var listItems = new List<ListItem>();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listItems.Add(new ListItem
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                ItemId = reader.GetInt32(reader.GetOrdinal("ItemId")),
                                ListId = reader.GetInt32(reader.GetOrdinal("ListId")),
                                Amount = reader.GetInt32(reader.GetOrdinal("Amount")),
                                ItemName = reader.GetString(reader.GetOrdinal("ItemName")) // Assuming ListItem has an ItemName property
                            });
                        }
                    }

                    return listItems;
                }
            }
        }
    }
}
