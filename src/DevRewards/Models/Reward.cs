using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevRewards.Models
{
    public class Reward
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int PointValue { get; set; }
    }
}
