using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prepare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;

        public MessageController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_messageRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var message = _messageRepository.GetById(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpPost]
        public IActionResult Post(Message message)
        {
            _messageRepository.AddMessage(message);
            return CreatedAtAction("Get", new { id = message.Id }, message);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }
            _messageRepository.UpdateMessage(message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _messageRepository.DeleteMessage(id);
            return NoContent();
        }

        [HttpGet("user/{userProfileId}")]
        public IActionResult GetByUserProfileId(int userProfileId)
        {
            var messages = _messageRepository.GetByUserProfileId(userProfileId);
            return Ok(messages);
        }
    }
}
