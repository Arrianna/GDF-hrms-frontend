using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class HelloController : ControllerBase
{
    [HttpGet]

    public IActionResult Get()
    {
        return Ok("testing info");
    }
}
}
