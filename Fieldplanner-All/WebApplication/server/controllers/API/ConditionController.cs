using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.server.controllers.API
{
    public class ConditionController : BaseApiController
    {
        public static List<ShootingCondition> conditions = new List<ShootingCondition>();

        public ConditionController()
        {
            if (conditions.Count < 1)
            {
                conditions.Add(new ShootingCondition("Stående utan stödhand", "Stå U", false, false));
                conditions.Add(new ShootingCondition("Stående utan stödhand 45", "Stå U 45", false, true));
                conditions.Add(new ShootingCondition("Stående", "Stå", true, false));
                conditions.Add(new ShootingCondition("Stående 45", "Stå 45", true, true));
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(conditions.ToList());
        }
    }

    public class ShootingCondition
    {
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public bool AngledArm { get; set; }
        public bool Supporthand { get; set; }
        

        public ShootingCondition()
        {

        }

        public ShootingCondition(string description, string shortDescription, bool supporthand, bool angledArm)
        {
            AngledArm = angledArm;
            Supporthand = supporthand;
            Description = description;
            ShortDescription = shortDescription;
        }

    }
}
