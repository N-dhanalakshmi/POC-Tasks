using ExcelActions.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ExcelActions.Controllers;

[ApiController]
[Route("[controller]")]
public class ActionsController : ControllerBase
{

    private readonly ExcelRepository repository;
    public ActionsController(ExcelRepository repository)
    {
        this.repository = repository;
    }

    [HttpGet]
    [Route("Employees")]

    public async Task<IActionResult> GetEmployeesList()
    {
        var file = await repository.ExportEmployees();
        if (file != null)
        {
            return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "data.xlsx");
        }
        return Ok("No employee data found");
    }

    // [HttpPost]
    // [Route("ImportEmployeeDetails")]

    // public async Task<IActionResult> ImportEmployeeDetails(IFormFile file)
    // {
    //     if (file == null || file.Length == 0)
    //         return BadRequest("No file uploaded.");
    //     await repository.ImportEmployees(file);
    //     return Ok("Employee Details imported to Database");
    // }

    [HttpPost]
    [Route("ExportSelectedFields")]
    public async Task<IActionResult> ExportSelectedFields(List<string> fields)
    {
        var file = await repository.ExportSelectedFields(fields);
        if (file != null)
        {
            return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "data.xlsx");
        }
        return Ok("No employee data found");
    }

    [HttpPost]
    [Route("ImportEmployeesForUpdate")]

    public async Task<IActionResult> ImportEmployeesForUpdate(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");
        await repository.ImportEmployeesForUpdate(file);
        return Ok("Employee Details imported to Database");
    }

}