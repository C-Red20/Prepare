using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prepare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly IListRepository _listRepository;

        public ListController(IListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        // GET: api/<ListController>
        [HttpGet]
        public IActionResult Get()
        {
            var lists = _listRepository.GetAll();
            return Ok(lists);
        }

        // GET api/<ListController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var list = _listRepository.GetById(id);
            if (list == null)
            {
                return NotFound($"List with ID {id} not found.");
            }
            return Ok(list);
        }

        // POST api/<ListController>
        [HttpPost]
        public IActionResult Post([FromBody] List list)
        {
            if (list == null)
            {
                return BadRequest("List cannot be null.");
            }

            _listRepository.AddList(list);
            return CreatedAtAction(nameof(Get), new { id = list.Id }, list);
        }

        // PUT api/<ListController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] List list)
        {
            if (list == null)
            {
                return BadRequest("List cannot be null.");
            }

            if (id != list.Id)
            {
                return BadRequest("List ID mismatch.");
            }

            var existingList = _listRepository.GetById(id);
            if (existingList == null)
            {
                return NotFound($"List with ID {id} not found.");
            }

            _listRepository.UpdateList(list);
            return NoContent();
        }

        // DELETE api/<ListController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingList = _listRepository.GetById(id);
            if (existingList == null)
            {
                return NotFound($"List with ID {id} not found.");
            }

            _listRepository.DeleteList(id);
            return NoContent();
        }
    }
}
