using MAC_API.Models;
using MySql.Data.EntityFramework;
using System.Data.Entity;

namespace MAC_API.Data
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() :
          base("MySqlConnectionString")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        //add DbSets here
        public DbSet<Ticket> Tickets { get; set; }
    }
}