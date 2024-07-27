using EmployeeDetails.Repositories;
using Microsoft.AspNetCore.Mvc;
using UserAPI.Models;

namespace UserAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _repository;

    public UserController(IUserRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    [Route("GetUser")]
    public IActionResult GetUser(string Email)
    {
        return Ok(_repository.GetUser(Email));
    }

    [HttpPost]
    [Route("AddUser")]
    public IActionResult AddUser(Users user)
    {
        _repository.AddUser(user);
        return Ok();
    }

    [HttpPut]
    [Route("UpdatePassword")]

    public IActionResult UpdatePassword(string Email, string Password)
    {
        _repository.UpdatePassword(Email, Password);
        return Ok();
    }

    [HttpPut]
    [Route("UpdateUser")]
    public IActionResult UpdateUser(Users users)
    {
        Users user = _repository.UpdateUser(users);
        return Ok(user);
    }

    [HttpDelete]
    [Route("DeleteUser")]

    public IActionResult DeleteUser(string Email)
    {
        _repository.DeleteUser(Email);
        return Ok();
    }

}