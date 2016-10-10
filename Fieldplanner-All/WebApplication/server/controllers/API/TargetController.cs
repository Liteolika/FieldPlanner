using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.server.controllers.API
{
    public class TargetController : BaseApiController
    {

        public static List<FigureModel> targets = new List<FigureModel>();

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
                        targets.Add(new FigureModel
                        {
                            ImagePath = fields[0],
                            Description = fields[1]
                        });
                    }
                }

                using (var file = System.IO.File.Open("C:\\Users\\Peter\\Desktop\\canaxa\\images\\f.json", FileMode.OpenOrCreate))
                using (var writer = new StreamWriter(file))
                {
                    var json = JsonConvert.SerializeObject(targets);
                    writer.Write(json);
                }

            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(targets.OrderBy(x=>x.Description).ToList());
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

    public class FigureModel
    {
        public Guid Id { get; internal set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public int TargetClass { get; set; }
        public FigureModel()
        {
            this.Id = Guid.NewGuid();
        }

    }

    

}
