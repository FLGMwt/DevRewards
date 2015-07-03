using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevRewards.Models
{
    public class DevRewardsContext : DbContext
    {
        public DbSet<Reward> Rewards { get; set; }
        public DbSet<User> Users { get; set; }
        //public DbSet<Claim> Claims { get; set; }
    }
}
