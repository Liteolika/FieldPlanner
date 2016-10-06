using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.server.controllers.API
{
    public class VersionController : BaseApiController
    {

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Startup.Configuration["AppSettings:Version"]);
        }

    }
}
