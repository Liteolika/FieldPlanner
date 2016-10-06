using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor;

namespace WebApplication.server
{
    public class ViewLocationExpander : IViewLocationExpander
    {
        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            return new[]
            {
                "/Server/Views/{1}/{0}.cshtml",
                "/Server/Views/{0}.cshtml"
            };
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {

        }
    }
}
