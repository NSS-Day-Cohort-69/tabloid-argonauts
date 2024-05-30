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


    [HttpDelete("{id}")]
    public IActionResult DeleteCategory(int id)
    {
        try
        {
            var category = _dbContext.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            _dbContext.Categories.Remove(category);
            _dbContext.SaveChanges();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCategory(int id, [FromBody] CategoryDTO categoryDTO)
    {
        try
        {
            var category = _dbContext.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }


            category.CategoryName = categoryDTO.CategoryName;

            _dbContext.SaveChanges();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryDTO categoryDTO)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = new Category
            {
                CategoryName = categoryDTO.CategoryName
            };

            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategories), category);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }



}






