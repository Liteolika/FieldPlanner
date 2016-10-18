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
                conditions.Add(new ShootingCondition("Stående utan stödhand", false, false));
                conditions.Add(new ShootingCondition("Stående utan stödhand 45", false, true));
                conditions.Add(new ShootingCondition("Stående", true, false));
                conditions.Add(new ShootingCondition("Stående 45", true, true));
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
        public string Description { get; set; }
        public bool AngledArm { get; set; }
        public bool Supporthand { get; set; }
        

        public ShootingCondition()
        {

        }

        public ShootingCondition(string description, bool supporthand, bool angledArm)
        {
            AngledArm = angledArm;
            Supporthand = supporthand;
            Description = description;
        }

    }
}
