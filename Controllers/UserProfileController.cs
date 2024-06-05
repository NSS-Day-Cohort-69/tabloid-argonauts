using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public UserProfileController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    [HttpGet("withroles")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            IsActive = up.IsActive,
            ApprovalNeeded = up.ApprovalNeeded,
            IdOfAdminApproved = up.IdOfAdminApproved,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList(),
            Subscribers = up.Subscribers.Select(s => new Subscription
            {
                CreatorId = s.CreatorId,
                FollowerId = s.FollowerId
            }).ToList(),
            Subscriptions = up.Subscriptions.Select(s => new Subscription
            {
                CreatorId = s.CreatorId,
                FollowerId = s.FollowerId
            }).ToList()
        }));
    }

    [HttpPost("promote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Promote(string id, int profileId)
    {

        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == profileId);
        userProfile.ApprovalNeeded = false;
        userProfile.IdOfAdminApproved = 0;

        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

[HttpPost("demote/{id}")]
[Authorize(Roles = "Admin")]
public IActionResult Demote(string id, int adminId)
{
    // Fetch the role with the name "Admin"
    IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
    if (role == null)
    {
        return NotFound("Admin role not found");
    }

    // Fetch the user profile for the given adminId
    UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == adminId);
    if (userProfile == null)
    {
        return NotFound("User profile not found");
    }

    // Reset approval status
    userProfile.ApprovalNeeded = false;
    userProfile.IdOfAdminApproved = 0;

    // Fetch the user role to be removed
    IdentityUserRole<string> userRole = _dbContext
        .UserRoles
        .SingleOrDefault(ur =>
            ur.RoleId == role.Id &&
            ur.UserId == id);

    if (userRole == null)
    {
        return NotFound("User role not found");
    }

    // Remove the user role
    _dbContext.UserRoles.Remove(userRole);
    _dbContext.SaveChanges();
    return NoContent();
}

    // [Authorize]
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        UserProfile user = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        user.Email = user.IdentityUser.Email;
        user.UserName = user.IdentityUser.UserName;
        user.Roles = _dbContext.UserRoles
       .Where(ur => ur.UserId == user.IdentityUserId)
       .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
       .ToList();
        return Ok(user);
    }

    [HttpGet("{id}/withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetByIdWithRoles(int id)
    {
        var user = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .Where(up => up.Id == id)
            .Select(up => new
            {
                up.Id,
                up.FirstName,
                up.LastName,
                up.IsActive,
                up.ApprovalNeeded,
                up.IdOfAdminApproved,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                up.IdentityUserId,
                Roles = _dbContext.UserRoles
                    .Where(ur => ur.UserId == up.IdentityUserId)
                    .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                    .ToList()
            }).SingleOrDefault();

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPut("{id}/toggle")]
    [Authorize(Roles = "Admin")]
    public IActionResult Toggle(int id)
    {
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        user.IsActive = !user.IsActive;
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPut("{id}/request")]
    [Authorize(Roles = "Admin")]
    public IActionResult Approve(int id, int adminId)
    {
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        if (!user.ApprovalNeeded)
        {
            user.ApprovalNeeded = true;
            user.IdOfAdminApproved = adminId;
            _dbContext.SaveChanges();
        }

        return NoContent();
    }
    [HttpPut("{id}/deny")]
    [Authorize(Roles = "Admin")]
    public IActionResult Deny(int id)
    {
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        if (user.ApprovalNeeded)
        {
            user.ApprovalNeeded = false;
            user.IdOfAdminApproved = 0;
            _dbContext.SaveChanges();
        }

        return NoContent();
    }

     [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromForm] IFormFile image, [FromForm] string firstName, [FromForm] string lastName,  [FromForm]string userName,  [FromForm]string email)
        {
            var userProfile = await _dbContext.UserProfiles.FindAsync(id);
            if (userProfile == null)
            {
                return NotFound();
            }

            userProfile.FirstName = firstName;
            userProfile.LastName = lastName;
            userProfile.UserName = userName;
            userProfile.Email = email;

            if (image != null && image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var filePath = Path.Combine(uploadsFolder, image.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                userProfile.ImageLocation = $"/uploads/{image.FileName}";
            }

            _dbContext.Entry(userProfile).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok(userProfile);
        }
}

