using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CommentController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CommentController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetComments(int postId)
    {
        List<Comment> comments = await _dbContext.Comments
            .Where(c => c.PostId == postId)
            .Include(c => c.UserProfile)
            .Select(c => new Comment
            {
                Id = c.Id,
                Content = c.Content,
                Subject = c.Subject,
                DateOfComment = c.DateOfComment,
                UserProfileId = c.UserProfileId,
                PostId = c.PostId,
                UserProfile = new UserProfile
                {
                    Id = c.UserProfile.Id,
                    FirstName = c.UserProfile.FirstName,
                    LastName = c.UserProfile.LastName,
                    UserName = c.UserProfile.UserName
                }
            })
            .ToListAsync();

        if (comments == null || comments.Count == 0)
        {
            return NotFound();
        }

        return Ok(comments);
    }
}
