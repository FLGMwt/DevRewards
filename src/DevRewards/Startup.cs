using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json.Serialization;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.ConfigurationModel;
using DevRewards.Models;
using Microsoft.Data.Entity.SqlServer;
using DevRewards.Services;

namespace DevRewards
{
    public class Startup
    {
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public IConfiguration Configuration { get; set; }
        public Startup(IHostingEnvironment env)
        {
            Configuration = new Configuration()
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().Configure<MvcOptions>(options =>
            {
                options.OutputFormatters
                .Where(a => a.Instance is JsonOutputFormatter)
                .Select(a => a.Instance as JsonOutputFormatter)
                .First()
                .SerializerSettings
                .ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddEntityFramework()
                .AddInMemoryStore()
                .AddDbContext<DevRewardsContext>();

            services.AddSingleton<IDevRewardsService, DevRewardsService>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMvc();

            AddFixtureData(app.ApplicationServices).Wait();
        }

        private async Task AddFixtureData(IServiceProvider applicationServices)
        {
            using (var dbContext = applicationServices.GetService<DevRewardsContext>())
            {
                var db = dbContext.Database as SqlServerDatabase;
                if (db != null)
                {
                    db.EnsureCreatedAsync().Wait();
                }

                dbContext.Rewards.AddRange(Enumerable.Range(1, 10)
                    .Select(a => new Reward
                    {
                        Id = a,
                        Name = $"Name for {a}",
                        Description = $"Description for {a}",
                        PointValue = a * 10
                    }));

                dbContext.Users.Add(new User
                {
                    Id = 1,
                    Name = "Ann",
                    Points = 100
                });

                await dbContext.SaveChangesAsync();
            }
        }
    }
}
