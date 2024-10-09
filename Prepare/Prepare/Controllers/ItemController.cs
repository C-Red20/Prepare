using Microsoft.AspNetCore.Http;
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
            return Ok(_itemRepository.GetAll());
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _itemRepository.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/<ItemController>
        [HttpPost]
        public IActionResult Post(Item item)
        {
            _itemRepository.AddItem(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

        // PUT api/<ItemController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }
            _itemRepository.UpdateItem(item);
            return NoContent();
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
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
