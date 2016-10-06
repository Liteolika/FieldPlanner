using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.server.controllers.API
{
    public class TargetController : BaseApiController
    {

        public static List<TargetModel> targets = new List<TargetModel>();

        public TargetController()
        {
            if (targets.Count < 1)
            {
                var fileContent = string.Empty;
                var filePath = Startup.Configuration["AppSettings:ImageRepositoryPath"];
                using (var file = System.IO.File.Open(filePath, System.IO.FileMode.Open))
                using (var reader = new StreamReader(file))
                {
                    fileContent = reader.ReadToEnd();
                }

                var lines = fileContent.Split('\n');
                foreach (var line in lines)
                {
                    if (!string.IsNullOrEmpty(line))
                    {
                        var fields = line.Split('|');
                        targets.Add(new TargetModel
                        {
                            ImagePath = fields[0],
                            Description = fields[1]
                        });
                    }
                }

            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(targets.ToList());
        }

        [HttpGet("getimage/{fileId}")]
        public async Task<IActionResult> GetImage(Guid fileId)
        {
            await Task.Delay(1);

            var target = targets.Where(x => x.Id == fileId).FirstOrDefault();
            if (target == null) return BadRequest("image not available");

            FileStream stream = new FileStream(target.ImagePath, FileMode.Open);

            return new FileStreamResult(stream, "image/jpg");
            //return Ok();
        }

    }

    public class TargetModel
    {
        public Guid Id { get; internal set; }
        public string Description { get; internal set; }
        public string ImagePath { get; internal set; }

        public TargetModel()
        {
            this.Id = Guid.NewGuid();
        }

    }

}
