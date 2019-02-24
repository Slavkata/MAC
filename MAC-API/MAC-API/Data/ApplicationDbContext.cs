using System.Data.Entity;

namespace MAC_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() :
          base("DatabaseConnectionString")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
        
        //add DbSets here
    }
}