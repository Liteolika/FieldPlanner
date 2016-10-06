using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.server.controllers.MVC
{
    public class MainController : BaseController
    {
        public IActionResult Index(string url)
        {
            return View();
        }
    }
}
