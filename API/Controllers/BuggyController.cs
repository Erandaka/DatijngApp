using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class BuggyController : BaseApiController
{
    private readonly DataContext _context;

    public BuggyController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<String> GetSecret()
    {
        return "Secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var item = _context.Users.Find(-1);
        if (item == null) return NotFound();
        return item;
    }

    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {
        var item = _context.Users.Find(-1);

        return item.ToString();
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadrequest()
    {
        return BadRequest("This was not a good request");
    }
}
