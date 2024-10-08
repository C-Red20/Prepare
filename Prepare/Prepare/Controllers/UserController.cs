using Microsoft.AspNetCore.Mvc;
using Prepare.Models;
using Prepare.Repositories;

namespace Prep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase // Changed to UserController for clarity
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var userProfile = _userRepository.GetByEmail(email); // Updated variable name

            if (userProfile == null) // Simplified null check
            {
                return NotFound();
            }
            return Ok(userProfile); // Return updated variable
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile) // Changed from User to UserProfile
        {
            _userRepository.Add(userProfile); // Update to userProfile
            return CreatedAtAction(
                nameof(GetByEmail), // Use nameof for better refactoring support
                new { email = userProfile.Email }, // Update to userProfile
                userProfile); // Update to userProfile
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll()); // Return all UserProfiles
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userRepository.GetById(id); // Updated variable name

            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile); // Return updated variable
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile) // Changed parameter type to UserProfile
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(userProfile); // Update to userProfile
            return NoContent();
        }
    }
}
