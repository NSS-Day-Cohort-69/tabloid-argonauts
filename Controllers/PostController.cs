using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult GetPosts()
    {
        return Ok(_dbContext.Posts
        .Include(p => p.UserProfile)
        .Include(p => p.Category)
        .Select(p => new Post
        {
            Id = p.Id,
            Title = p.Title,
            HeaderImage = p.HeaderImage,
            Content = p.Content,
            CreationDate = p.CreationDate,
            PublicationDate = p.PublicationDate,
            CategoryId = p.CategoryId,
            Category = new Category
            {
                Id = p.Category.Id,
                CategoryName = p.Category.CategoryName
            },
            UserProfileId = p.UserProfileId,
            UserProfile = new UserProfile
            {
                Id = p.UserProfile.Id,
                FirstName = p.UserProfile.FirstName,
                LastName = p.UserProfile.LastName,
                CreateDateTime = p.UserProfile.CreateDateTime,
                ImageLocation = p.UserProfile.ImageLocation,
            },
            IsApproved = p.IsApproved
        })
        .Where(p => p.IsApproved == true && p.PublicationDate < DateTime.Now)
        .OrderByDescending(p => p.PublicationDate)
        );
    }

    [HttpGet("{id}")]
    [Authorize]

    public IActionResult GetPostById(int id)
    {
        Post post = _dbContext.Posts
        .Include(p => p.UserProfile)
        .SingleOrDefault(p => p.Id == id);

        if(post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }

}