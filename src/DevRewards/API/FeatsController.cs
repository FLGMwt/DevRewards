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
    public class FeatsController : Controller
    {
        private readonly IDevRewardsService _service;

        public FeatsController(IDevRewardsService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<Feat>> Get()
        {
            return await _service.GetAllFeatsAsync();
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

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
