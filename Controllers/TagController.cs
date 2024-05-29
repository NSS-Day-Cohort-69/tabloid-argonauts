
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public TagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]
    public IActionResult GetAll()
    {
        return Ok(_dbContext.Tags.ToList());
    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreateTag(Tag tag)
    {
        _dbContext.Tags.Add(tag);
        _dbContext.SaveChanges();
        return Created($"/api/tags/{tag.Id}", tag);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateTag(Tag tag, int id)
    {
        Tag tagToUpdate = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
        if (tagToUpdate == null)
        {
            return NotFound();
        }
        else if (id != tagToUpdate.Id)
        {
            return BadRequest();
        }

        tagToUpdate.TagName = tag.TagName;

        _dbContext.SaveChanges();

        return NoContent();
    }


    [HttpDelete("delete/{id}")]
    //[Authorize]
    public IActionResult DeleteTag(int id)
    {
        Tag tagToDelete = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
        if (tagToDelete == null)
        {
            return NotFound();
        }
        
        _dbContext.Tags.Remove(tagToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    }
}