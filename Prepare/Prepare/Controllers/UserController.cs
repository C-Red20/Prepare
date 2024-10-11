using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var userProfile = _userRepository.GetByEmail(email);
            if (userProfile == null)
            {
                return NotFound($"User with email {email} not found.");
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            if (userProfile == null)
            {
                return BadRequest("UserProfile is null.");
            }

            _userRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByEmail),
                new { email = userProfile.Email },
                userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userProfiles = _userRepository.GetAll();
            return Ok(userProfiles);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            return Ok(userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (userProfile == null)
            {
                return BadRequest("UserProfile is null.");
            }

            if (id != userProfile.Id)
            {
                return BadRequest("ID mismatch.");
            }

            var existingUserProfile = _userRepository.GetById(id);
            if (existingUserProfile == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            _userRepository.Update(userProfile);
            return NoContent();
        }
    }
}
