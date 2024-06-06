using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models.DTOs;

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

    public IActionResult GetPosts(string? search, int? categoryId)
    {

        List<Post> posts = _dbContext.Posts
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
                Subscribers = p.UserProfile.Subscribers.Select(s => new Subscription
                {
                    CreatorId = s.CreatorId,
                    FollowerId = s.FollowerId
                }).ToList(),
                Subscriptions = p.UserProfile.Subscriptions.Select(s => new Subscription
                {
                    CreatorId = s.CreatorId,
                    FollowerId = s.FollowerId
                }).ToList()
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
                }
            }).ToList()
        })
        .Where(p => p.IsApproved == true && p.PublicationDate < DateTime.Now)
        .OrderByDescending(p => p.PublicationDate).ToList();

        if (search != null)
        {
            posts = posts.Where(p => p.PostTags.Any(pt => pt.Tag.TagName.ToUpper().Contains(search.ToUpper()))).ToList();
        }

        if (categoryId != null)
        {
            posts = posts.Where(p => p.CategoryId == categoryId).ToList();
        }

        if (search != null & categoryId != null)
        {
            posts = posts.Where(p => p.PostTags.Any(pt => pt.Tag.TagName.ToUpper().Contains(search.ToUpper())) && p.CategoryId == categoryId).ToList();

        }

        return Ok(posts);

    }

    [HttpGet("{id}")]
    // [Authorize]

    public IActionResult GetPostById(int id)
    {
        Post post = _dbContext.Posts
        .Include(p => p.UserProfile)
        .ThenInclude(up => up.IdentityUser)
        .Include(p => p.UserProfile)
        .ThenInclude(s => s.Subscriptions)
        .Include(up => up.UserProfile)
        .ThenInclude(s => s.Subscribers)
        .Include(p => p.Tags)
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
        .Include(p => p.PostReactions)
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

    public IActionResult CreatePost([FromBody] Post post)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!_dbContext.Categories.Any(c => c.Id == post.CategoryId))
        {
            return BadRequest("Invalid CategoryId. Category does not exist.");
        }

        if (!_dbContext.UserProfiles.Any(u => u.Id == post.UserProfileId))
        {
            return BadRequest("Invalid UserProfileId. User profile does not exist.");
        }

        bool isAdmin = User.IsInRole("Admin");

        if (!isAdmin)
        {
            post.IsApproved = false;
        }

        post.PublicationDate = DateTime.Now;
        post.CreationDate = DateTime.Now;
        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();

        return CreatedAtAction(nameof(GetPostById), new { id = post.Id }, post);
    }

    [HttpPost("{id}")]
    // [Authorize]
    public IActionResult NewPostTag(int id, List<int> tagIds)
    {
        List<PostTag> postTags = _dbContext.PostTags.ToList();
        foreach (PostTag postTag in postTags)
        {
            if (postTag.PostId == id)
            {
                _dbContext.PostTags.Remove(postTag);
            }
        }

        _dbContext.SaveChanges();

        foreach (int tagId in tagIds)
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

    [HttpPost("postReaction")]
    // [Authorize]

    public IActionResult NewPostReaction(PostReaction postReaction)
    {
        PostReaction foundPostReaction = _dbContext.postReactions.SingleOrDefault(pr => pr == postReaction);
        if (foundPostReaction == null)
        {
            _dbContext.postReactions.Add(postReaction);
        }
        _dbContext.SaveChanges();

        return Created($"/api/post/postReaction", postReaction);
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

    [HttpGet("postReaction/{postId}")]
    // [Authorize]

    public IActionResult getReactionCount(int postId, int reactionId)
    {
        return Ok(_dbContext.postReactions.Count(pr => pr.PostId == postId && pr.ReactionId == reactionId));
    }


    [HttpGet("pending")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetPendingPosts()
    {
        var pendingPosts = _dbContext.Posts
            .Include(p => p.UserProfile)
            .Include(p => p.Category)
            .Include(p => p.PostTags)
            .ThenInclude(pt => pt.Tag)
            .Include(p => p.PostReactions)
            .Where(p => !p.IsApproved)
            .OrderByDescending(p => p.PublicationDate)
            .ToList();

        return Ok(pendingPosts);
    }

    [HttpPut("{id}/approve")]
    // [Authorize(Roles = "Admin")]
    public IActionResult ApprovePost(int id)
    {
        var post = _dbContext.Posts.Find(id);
        if (post == null)
        {
            return NotFound();
        }

        post.IsApproved = true;
        _dbContext.SaveChanges();

        return Ok(post);
    }

    [HttpPut("{id}/reject")]
    // [Authorize(Roles = "Admin")]
    public IActionResult RejectPost(int id)
    {
        var post = _dbContext.Posts.Find(id);
        if (post == null)
        {
            return NotFound();
        }

        post.IsApproved = false;
        _dbContext.SaveChanges();

        return Ok(post);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> UpdatePost(int id, [FromForm] string title, [FromForm] string content, [FromForm] int categoryId, [FromForm] IFormFile image )
    {
        Post post = _dbContext.Posts
        .SingleOrDefault(p => p.Id == id);
        if (post == null)
        {
            return NotFound();
        }
        post.Title = title;
        post.Content = content;
        post.CategoryId = categoryId;

        if (image != null && image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "client", "public", "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var filePath = Path.Combine(uploadsFolder, image.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                post.HeaderImage = $"/uploads/{image.FileName}";
            }

            _dbContext.Entry(post).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok(post);
    }

}