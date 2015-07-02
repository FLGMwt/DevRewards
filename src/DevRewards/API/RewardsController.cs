using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using DevRewards.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DevRewards.API
{
    [Route("api/[controller]")]
    public class RewardsController : Controller
    {
        static public List<Reward> _rewards = Enumerable.Range(1, 10)
            .Select(a => new Reward
            {
                Id = a,
                Name = $"Name for {a}",
                Description = $"Description for {a}",
                PointValue = a * 10
            }).ToList();

        // GET: api/values
        [HttpGet]
        public IEnumerable<Reward> Get()
        {
            return _rewards;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Reward Get(int id)
        {
            return _rewards.SingleOrDefault(a => a.Id == id);
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
