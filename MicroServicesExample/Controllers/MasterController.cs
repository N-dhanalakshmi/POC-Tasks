using MicroServicesExample.Models;
using MicroServicesExample.Proxies;
using MicroServicesExample.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicroServicesExample.Controllers;

[ApiController]
[Route("[controller]")]

public class MasterController : ControllerBase
{
    private readonly EmployerProxy Employer_API;
    private readonly UserProxy User_API;
    private readonly AuthenticationService _Service;
    public MasterController(EmployerProxy Employer_API, UserProxy User_API, AuthenticationService Service)
    {
        this.Employer_API = Employer_API;
        this.User_API = User_API;
        _Service = Service ;
    }

    [HttpGet]
    [Route("UserById")]
    public async Task<IActionResult> GetUserById(string Email)
    {
        Console.WriteLine(Email);
        var user = await User_API.GetUser(Email);
        return Ok(user);
    }

    [HttpGet]
    [Route("AllEmployees")]
    public async Task<IActionResult> GetAllEmployees()
    {
        Console.WriteLine("Email");
        var user = await Employer_API.GetAllUser();
        return Ok(user);
    }

    [HttpGet]
    [Route("EmployeesBySearch")]
    public async Task<IActionResult> GetEmployeesBySearch(string SearchKey)
    {
        Console.WriteLine("Email");
        var user = await Employer_API.GetUserBySearch(SearchKey);
        return Ok(user);
    }

    [HttpPost]
    [Route("AddUser")]
    public async Task<IActionResult> AddUser(AddUserDTO user)
    {
        Console.WriteLine(user.Email);
        var employerTask = Employer_API.AddUser(user);
        var userTask = User_API.AddUser(user);
        await Task.WhenAll(employerTask, userTask);
        return Ok();
    }

    [HttpDelete]
    [Route("DeleteEmployee")]

    public async Task<IActionResult> DeleteEmployee(string Email)
    {
        Console.WriteLine(Email);
        var employeeTask = Employer_API.DeleteEmployee(Email);
        var userTask = User_API.DeleteUser(Email);
        await Task.WhenAll(employeeTask, userTask);
        return Ok();
    }

    [HttpPut]
    [Route("UpdatePassword")]
    public async Task<IActionResult> UpdatePassword(string Email, string Password)
    {
        await User_API.UpdatePassword(Email, Password);
        return Ok();
    }
    
    [Authorize]
    [HttpPost]
    [Route("EventResponse")]
    public IActionResult GetEventResponse(string Response)
    {
        Console.WriteLine(Response);
        return Ok(Response);
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login(Login login){
        var user = await User_API.GetUser(login.Email);
        if(user.Password==login.Password)
        {
            return Ok(_Service.CreateToken(login));
        }
        return BadRequest();
    }

    [HttpPost]
    [Route("SaveTemplate")]
    public async Task<IActionResult> SaveTemplate(Templates template)
    {
        await Employer_API.SaveTemplate(template);
        return Ok();
    }

    [HttpGet]
    [Route("Templates")]
    public async Task<IActionResult> GetTemplate()
    {
        IEnumerable<Templates> template = await Employer_API.GetTemplate();
        return Ok(template);
    }
}
