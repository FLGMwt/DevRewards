using DevRewards.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevRewards.Services
{
    public interface IDevRewardsService
    {
        Task<Reward> GetRewardAsync(int id);
        Task<User> GetUserAsync(int id);
        Task<IEnumerable<Reward>> GetAllRewardsAsync();
    }
}