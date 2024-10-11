using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prepare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public IActionResult Get()
        {
            var categories = _categoryRepository.GetAll();
            return Ok(categories);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Post(Category category)
        {
            if (category == null)
            {
                return BadRequest("Category cannot be null.");
            }

            _categoryRepository.AddCategory(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (category == null)
            {
                return BadRequest("Category cannot be null.");
            }

            if (id != category.Id)
            {
                return BadRequest("Category ID mismatch.");
            }

            var existingCategory = _categoryRepository.GetById(id);
            if (existingCategory == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            _categoryRepository.UpdateCategory(category);
            return NoContent();
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingCategory = _categoryRepository.GetById(id);
            if (existingCategory == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            _categoryRepository.DeleteCategory(id);
            return NoContent();
        }
    }
}
