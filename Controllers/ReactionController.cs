
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public ReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

   [HttpGet]
//    [Authorize]

    public IActionResult GetReactions()
    {
        return Ok(_dbContext.Reactions.ToList());
    }

    [HttpPost]
    // [Authorize]

    public IActionResult NewReaction(Reaction reaction)
    {
        _dbContext.Reactions.Add(reaction);
        _dbContext.SaveChanges();

          return Created($"/api/reaction/{reaction.Id}", reaction);
    }
}