using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json.Serialization;
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

                var rewards = new[]
                {
                    new {name = "Apple", description = "You eat it" },
                    new {name = "Lamp", description = "Bring me the ^" },
                    new {name = "Coconuts", description = "A lovely bunch of them" },
                    new {name = "Packages", description = "barely even human" },
                    new {name = "A Chair", description = "It's what you sit in" },
                    new {name = "Televison", description = "Watch it and your productivity melt like the timepieces of Dali" },
                    new {name = "Chandelier", description = "Ooh, shiny" },
                    new {name = "Blue Label Manhattan", description = "Drink of champions" },
                    new {name = "Guitar", description = "Comes untuned" },
                    new {name = "Apartment Complex", description = "Makes sense to make large investments with fake internet points, eh?" }
                };

                dbContext.Rewards.AddRange(Enumerable.Range(0, 10)
                    .Select(a => new Reward
                    {
                        Id = a + 1,
                        Name = rewards[a].name,
                        Description = rewards[a].description,
                        PointValue = (a + 1) * 10
                    }));

                dbContext.Feats.AddRange(Enumerable.Range(1, 10)
                    .Select(a => new Feat
                    {
                        Id = a,
                        Name = $"Feat Name for {a}",
                        Description = $"Feat Description for {a}",
                        PointValue = a * 10
                    }));

                dbContext.Users.Add(new User
                {
                    Id = 1,
                    Name = "Ann",
                    Points = 100000
                });

                await dbContext.SaveChangesAsync();
            }
        }
    }
}
