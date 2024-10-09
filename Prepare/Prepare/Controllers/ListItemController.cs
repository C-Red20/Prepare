using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prepare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListItemController : ControllerBase
    {
        private readonly IListItemRepository _listItemRepository;

        public ListItemController(IListItemRepository listItemRepository)
        {
            _listItemRepository = listItemRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_listItemRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var listItem = _listItemRepository.GetById(id);
            if (listItem == null)
            {
                return NotFound();
            }
            return Ok(listItem);
        }

        [HttpPost]
        public IActionResult Post(ListItem listItem)
        {
            _listItemRepository.AddListItem(listItem);
            return CreatedAtAction("Get", new { id = listItem.Id }, listItem);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ListItem listItem)
        {
            if (id != listItem.Id)
            {
                return BadRequest();
            }
            _listItemRepository.UpdateListItem(listItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _listItemRepository.DeleteListItem(id);
            return NoContent();
        }

        [HttpGet("list/{listId}")]
        public IActionResult GetByListId(int listId)
        {
            var listItems = _listItemRepository.GetByListId(listId);
            return Ok(listItems);
        }
    }
}
