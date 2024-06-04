
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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
    //   [Authorize]
    public IActionResult NewSubscription(Subscription subscription)
    {

        Subscription subscriptionToAdd = new Subscription
        {
            CreatorId = subscription.CreatorId,
            FollowerId = subscription.FollowerId,
            StartDate = DateTime.Now
        };
        _dbContext.Subscriptions.Add(subscriptionToAdd);

        _dbContext.SaveChanges();
        return Created($"/api/subscription/{subscription}", subscription);

    }
}