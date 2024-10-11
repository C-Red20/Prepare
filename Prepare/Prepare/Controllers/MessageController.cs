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
        public IActionResult GetAll()
        {
            var messages = _messageRepository.GetAll();
            return Ok(messages);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var message = _messageRepository.GetById(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpPost]
        public IActionResult Create(Message message)
        {
            _messageRepository.AddMessage(message);
            return CreatedAtAction(nameof(GetById), new { id = message.Id }, message);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest("Message ID mismatch.");
            }

            var existingMessage = _messageRepository.GetById(id);
            if (existingMessage == null)
            {
                return NotFound();
            }

            _messageRepository.UpdateMessage(message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingMessage = _messageRepository.GetById(id);
            if (existingMessage == null)
            {
                return NotFound();
            }

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
