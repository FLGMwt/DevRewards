using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using DevRewards.Models;
using DevRewards.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DevRewards.Controllers
{
    [Route("api/[controller]")]
    public class ClaimsController : Controller
    {
        private readonly IDevRewardsService _service;

        public ClaimsController(IDevRewardsService service)
        {
            _service = service;
        }

        //// GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<string> Get(int id)
        {
            return await Task.FromResult("test");
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody]Claim claim)
        {
            var user = await _service.GetUserAsync(claim.UserId);
            var reward = await _service.GetRewardAsync(claim.RewardId);
            Task.Delay(500).Wait();
            if (user.Points >= reward.PointValue)
            {
                user.Points -= reward.PointValue;
            }
        }

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
