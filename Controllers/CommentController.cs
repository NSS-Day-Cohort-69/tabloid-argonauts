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
        public async Task<IActionResult> GetComments([FromQuery] int postId)
        {
            List<Comment> comments = _dbContext.Comments
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
                        FirstName = c.Post.UserProfile.FirstName,
                        LastName = c.Post.UserProfile.LastName,
                        UserName = c.Post.UserProfile.UserName
                    }
                })
                .ToList();

            if (comments == null || comments.Count == 0)
            {
                return NotFound();
            }

            return Ok(comments);
        }
    }
