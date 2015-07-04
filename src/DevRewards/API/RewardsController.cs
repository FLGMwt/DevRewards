using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using DevRewards.Models;
using DevRewards.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DevRewards.API
{
    [Route("api/[controller]")]
    public class RewardsController : Controller
    {
        private readonly IDevRewardsService _service;

        public RewardsController(IDevRewardsService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<Reward>> Get()
        {
            return await _service.GetAllRewardsAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<Reward> Get(int id)
        {
            return await _service.GetRewardAsync(id);
        }

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]Reward value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]Reward value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
