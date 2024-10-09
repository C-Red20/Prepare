using Microsoft.AspNetCore.Http;
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
            return Ok(_listRepository.GetAll());
        }

        // GET api/<ListController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var list = _listRepository.GetById(id);
            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        // POST api/<ListController>
        [HttpPost]
        public IActionResult Post(List list)
        {
            _listRepository.AddList(list);
            return CreatedAtAction("Get", new { id = list.Id }, list);
        }

        // PUT api/<ListController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, List list)
        {
            if (id != list.Id)
            {
                return BadRequest();
            }
            _listRepository.UpdateList(list);
            return NoContent();
        }

        // DELETE api/<ListController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _listRepository.DeleteList(id);
            return NoContent();
        }
    }
}
