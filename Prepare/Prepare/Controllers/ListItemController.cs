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
            var listItems = _listItemRepository.GetAll();
            return Ok(listItems);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var listItem = _listItemRepository.GetById(id);
            if (listItem == null)
            {
                return NotFound($"ListItem with ID {id} not found.");
            }
            return Ok(listItem);
        }

        [HttpPost]
        public IActionResult Post(ListItem listItem)
        {
            if (listItem == null)
            {
                return BadRequest("ListItem cannot be null.");
            }

            if (listItem.ItemId <= 0 || listItem.ListId <= 0 || listItem.Amount < 0)
            {
                return BadRequest("Invalid ListItem properties.");
            }

            // Optionally, you could check if ItemId and ListId exist in the database here before adding

            _listItemRepository.AddListItem(listItem);
            return CreatedAtAction(nameof(Get), new { id = listItem.Id }, listItem);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, ListItem listItem)
        {
            if (listItem == null)
            {
                return BadRequest("ListItem cannot be null.");
            }

            if (id != listItem.Id)
            {
                return BadRequest("ID mismatch.");
            }

            var existingListItem = _listItemRepository.GetById(id);
            if (existingListItem == null)
            {
                return NotFound($"ListItem with ID {id} not found.");
            }

            _listItemRepository.UpdateListItem(listItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingListItem = _listItemRepository.GetById(id);
            if (existingListItem == null)
            {
                return NotFound($"ListItem with ID {id} not found.");
            }

            _listItemRepository.DeleteListItem(id);
            return NoContent();
        }

        [HttpGet("list/{listId}")]
        public IActionResult GetByListId(int listId)
        {
            var listItems = _listItemRepository.GetByListId(listId);
            if (listItems == null || !listItems.Any())
            {
                return NotFound($"No ListItems found for List ID {listId}.");
            }
            return Ok(listItems);
        }
    }
}
