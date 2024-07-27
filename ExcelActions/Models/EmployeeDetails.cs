using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ExcelActions.Models;
[Keyless]
public class EmployeeDetails
{
    public long? EmpId { get; set; }
    public string? EmployeeNo { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Designation { get; set; }
    public string? Domain { get; set; }
    public string? Address { get; set; }
    public string? MobileNo { get; set; }
}
