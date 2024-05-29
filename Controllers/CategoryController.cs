using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CategoryController(TabloidDbContext context)
    {
        _dbContext = context;
    }


  [HttpGet]
  [Authorize]
        public IActionResult GetCategories()
        {
            var categories = _dbContext.Categories.ToList();

            var categoryDTOs = categories.Select(c => new CategoryDTO
            {
                Id = c.Id,
                CategoryName = c.CategoryName
            })
            .ToList();

            return Ok(categoryDTOs);
        }
    
    
    }






