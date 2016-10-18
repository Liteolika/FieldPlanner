using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication.server.controllers.API
{
    public class TargetController : BaseApiController
    {

        public static object _locker = new object();
        public static List<FigureModel> _targets = new List<FigureModel>();

        public TargetController()
        {
            if (_targets.Count < 1)
            {
                lock (_locker)
                {
                    var json = string.Empty;
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "server", "statics", "targets", "targets.json");
                    using (var file = System.IO.File.Open(filePath, System.IO.FileMode.Open))
                    using (var reader = new StreamReader(file, Encoding.UTF8))
                    {
                        json = reader.ReadToEnd();
                    }

                    _targets = JsonConvert.DeserializeObject<List<FigureModel>>(json);
                }

                //var fileContent = string.Empty;
                //var filePath = Startup.Configuration["AppSettings:ImageRepositoryPath"];
                //using (var file = System.IO.File.Open(filePath, System.IO.FileMode.Open))
                //using (var reader = new StreamReader(file))
                //{
                //    fileContent = reader.ReadToEnd();
                //}

                //var lines = fileContent.Split('\n');
                //foreach (var line in lines)
                //{
                //    if (!string.IsNullOrEmpty(line))
                //    {
                //        var fields = line.Split('|');
                //        targets.Add(new FigureModel
                //        {
                //            ImagePath = fields[0],
                //            Description = fields[1]
                //        });
                //    }
                //}

                //using (var file = System.IO.File.Open("C:\\Users\\Peter\\Desktop\\canaxa\\images\\f.json", FileMode.OpenOrCreate))
                //using (var writer = new StreamWriter(file))
                //{
                //    var json = JsonConvert.SerializeObject(targets);
                //    writer.Write(json);
                //}

            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_targets.OrderBy(x => x.Description).ToList());
        }

        [HttpGet("getimage/{fileId}")]
        public IActionResult GetImage(Guid fileId)
        {

            var target = _targets.Where(x => x.Id == fileId).FirstOrDefault();
            if (target == null) return BadRequest("image not available");

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "server", "statics", "targets", target.Article + ".jpg");

            FileStream stream = new FileStream(filePath, FileMode.Open);

            return new FileStreamResult(stream, "image/jpg");
        }

        [HttpGet("distances")]
        public IActionResult GetDistances()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "server", "statics", "distances.json");
            var json = string.Empty;
            using (var file = System.IO.File.Open(filePath, System.IO.FileMode.Open))
            using (var reader = new StreamReader(file))
            {
                json = reader.ReadToEnd();
            }

            var result = JsonConvert.DeserializeObject<List<DistanceModel>>(json);
            return Ok(result);
        }

    }

    public class DistanceModel
    {
        public int FigureGroup { get; set; }
        public int A { get; set; }
        public int R { get; set; }
        public int B { get; set; }
        public int C { get; set; }

    }

    public class FigureModel
    {
        public Guid Id { get; set; }
        public string Supplier { get; set; }
        public string Article { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public int FigureGroup { get; set; }
        public int FigureShift { get; set; }

        public string Description { get; set; }
        public string ImagePath { get; set; }


    }



}
