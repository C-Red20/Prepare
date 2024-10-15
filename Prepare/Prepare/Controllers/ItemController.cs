using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prepare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;

        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        // GET: api/<ItemController>
        [HttpGet]
        public IActionResult Get()
        {
            var items = _itemRepository.GetAll();
            return Ok(items);
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _itemRepository.GetById(id);
            if (item == null)
            {
                return NotFound($"Item with ID {id} not found.");
            }
            return Ok(item);
        }

        // POST api/<ItemController>
        [HttpPost]
        public IActionResult Post(Item item)
        {
            if (item == null)
            {
                return BadRequest("Item cannot be null.");
            }

            // Ensure the UserProfileId is valid and is being passed correctly
            if (item.UserProfileId <= 0)
            {
                return BadRequest("Invalid UserProfileId.");
            }

            // Set the default value for 'Have' as true
            item.Have = true; // If it should always be true when created

            _itemRepository.AddItem(item, item.UserProfileId); // Pass UserProfileId explicitly
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        // PUT api/<ItemController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Item item)
        {
            if (item == null)
            {
                return BadRequest("Item cannot be null.");
            }

            if (id != item.Id)
            {
                return BadRequest("Item ID mismatch.");
            }

            var existingItem = _itemRepository.GetById(id);
            if (existingItem == null)
            {
                return NotFound($"Item with ID {id} not found.");
            }

            _itemRepository.UpdateItem(item);
            return NoContent();
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingItem = _itemRepository.GetById(id);
            if (existingItem == null)
            {
                return NotFound($"Item with ID {id} not found.");
            }

            _itemRepository.DeleteItem(id);
            return NoContent();
        }

        // Optionally, GET items by UserProfileId
        [HttpGet("user/{userProfileId}")]
        public IActionResult GetByUserProfileId(int userProfileId)
        {
            var items = _itemRepository.GetByUserProfileId(userProfileId);
            return Ok(items);
        }

        // Optionally, GET items by CategoryId
        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategoryId(int categoryId)
        {
            var items = _itemRepository.GetByCategoryId(categoryId);
            return Ok(items);
        }
    }
}
