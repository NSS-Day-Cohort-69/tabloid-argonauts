
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubscriptionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public SubscriptionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
      [Authorize]
    public IActionResult NewSubscription(Subscription subscription)
    {
        Subscription subscriptionToAdd = new Subscription
        {
            CreatorId = subscription.CreatorId,
            FollowerId = subscription.FollowerId,
            StartDate = DateTime.Now
        };
        
        Subscription foundSubscription = _dbContext.Subscriptions.SingleOrDefault((s) => s == subscription);
        if(foundSubscription == null)
        {
            _dbContext.Subscriptions.Add(subscriptionToAdd);

            _dbContext.SaveChanges();
        }
        else
        {
            _dbContext.Subscriptions.Remove(foundSubscription);
            _dbContext.Subscriptions.Add(subscriptionToAdd);
            _dbContext.SaveChanges();        
        }
        return Created($"/api/subscription/{subscription}", subscription);

    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetSubscriptions()
    {
        return Ok(_dbContext.Subscriptions.ToList());
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetSubscriptionsById(int id)
    {
        List<Subscription> FoundSubscriptions = _dbContext.Subscriptions
        .Include(s => s.Creator)
        .ThenInclude(c => c.posts)
        .ThenInclude(c => c.Category)
        .Where(s => s.FollowerId == id && s.EndDate == null).ToList();
        return Ok(FoundSubscriptions);
    }

    [HttpPut]
    // [Authorize]
    
    public IActionResult Unsubscribe(Subscription subscription)
    {
        Subscription subToUpdate = _dbContext.Subscriptions.SingleOrDefault((s) => s == subscription);
        if(subToUpdate == null)
        {
            return NotFound();
        }

        subToUpdate.EndDate = DateTime.Now;
        _dbContext.SaveChanges();

        return NoContent();
    }

} 