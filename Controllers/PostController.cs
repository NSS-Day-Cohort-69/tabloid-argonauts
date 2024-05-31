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
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag) 
        .Include(p => p.PostReactions)
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
            IsApproved = p.IsApproved,
            PostTags = p.PostTags.Select(pt => new PostTag
            {
                PostId = pt.PostId,
                TagId = pt.TagId,
                Tag = new Tag
                {
                    Id = pt.Tag.Id,
                    TagName = pt.Tag.TagName
                },
            }).ToList()
        })
        .Where(p => p.IsApproved == true && p.PublicationDate < DateTime.Now)
        .OrderByDescending(p => p.PublicationDate)
        );
    }

    [HttpGet("{id}")]
    // [Authorize]

    public IActionResult GetPostById(int id)
    {
        Post post = _dbContext.Posts
        .Include(p => p.UserProfile)
        .Include(p => p.Tags)
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag) 
        .SingleOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    private bool CategoryExists(int categoryId)
    {
        return _dbContext.Categories.Any(c => c.Id == categoryId);
    }


    [HttpPost]
    //[Authorize]
    public IActionResult CreatePost(Post post)
    {
        post.PublicationDate = DateTime.Now;
        if (!CategoryExists(post.CategoryId))
        {
            return BadRequest("Invalid CategoryId. Category does not exist.");
        }
        _dbContext.Posts.Add(post);
        try 
        {
        _dbContext.SaveChanges();
        }
        catch (DbUpdateException ex)
        {
            Console.WriteLine(ex);
            if (ex.InnerException != null)
            {
                Console.WriteLine(ex.InnerException.Message);
            }

            return StatusCode(500, "Internal server error");
        }
        return Created($"/api/post/{post.Id}", post);
    }

    [HttpPost("{id}")]
    // [Authorize]
    public IActionResult NewPostTag(int id, List<int> tagIds)
    {
        List<PostTag> postTags = _dbContext.PostTags.ToList();
        foreach(PostTag postTag in postTags)
        {
            if(postTag.PostId == id)
            {
                _dbContext.PostTags.Remove(postTag);
            }
        }

        _dbContext.SaveChanges();

        foreach(int tagId in tagIds)
        {
            PostTag postTagToAdd = new PostTag
            {
                PostId = id,
                TagId = tagId
            };
          
             _dbContext.PostTags.Add(postTagToAdd);
  
        }

        _dbContext.SaveChanges();

        return Ok();
    }


    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeletePost(int id)
    {
        try
        {
            var post = _dbContext.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            _dbContext.Posts.Remove(post);
            _dbContext.SaveChanges();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}