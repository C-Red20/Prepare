using Prepare.Models; // Adjust the namespace according to your project structure
using Prepare.Utils; // Assuming you have a DbUtils class for utility methods
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Prepare.Repositories;

namespace Prep.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email
                        FROM UserProfile
                        WHERE Email = @Email";

                    DbUtils.AddParameter(cmd, "@Email", email);

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                    reader.Close();

                    return userProfile; // Return the correct variable
                }
            }
        }

        public void Add(UserProfile userProfile) // Update parameter type
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (Name, Email)
                        OUTPUT INSERTED.Id
                        VALUES (@Name, @Email)";

                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);

                    userProfile.Id = (int)cmd.ExecuteScalar(); // Update to userProfile
                }
            }
        }

        public List<UserProfile> GetAll() // Update return type
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Email
                        FROM UserProfile";

                    var reader = cmd.ExecuteReader();
                    var users = new List<UserProfile>(); // Update list type

                    while (reader.Read())
                    {
                        users.Add(new UserProfile() // Update to UserProfile
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        });
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public UserProfile GetById(int id) // Update return type
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email
                        FROM UserProfile
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null; // Update to UserProfile
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile() // Update to UserProfile
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                    reader.Close();

                    return userProfile; // Return the correct variable
                }
            }
        }

        public void Update(UserProfile userProfile) // Update parameter type
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET Name = @Name, Email = @Email
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
