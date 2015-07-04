using DevRewards.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevRewards.Services
{
    public class DevRewardsService : IDevRewardsService
    {
        private readonly DevRewardsContext _context;

        public DevRewardsService(DevRewardsContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserAsync(int id)
        {
            return await _context.Users.SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Reward> GetRewardAsync(int id)
        {
            return await _context.Rewards.SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Reward>> GetAllRewardsAsync()
        {
            return await _context.Rewards.ToListAsync();
        }
    }
}
